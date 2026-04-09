<?php
declare(strict_types=1);

use PDO;
use PDOException;
use RuntimeException;

final class HttpError extends RuntimeException
{
    public function __construct(
        public readonly int $statusCode,
        string $message,
        public readonly array $payload = [],
    ) {
        parent::__construct($message);
    }
}

final class Config
{
    public function __construct(private readonly array $values)
    {
    }

    public static function load(string $rootPath): self
    {
        $configFile = $rootPath . '/config/app.php';
        if (!is_file($configFile)) {
            $configFile = $rootPath . '/config/app.example.php';
        }

        /** @var array<string, mixed> $config */
        $config = require $configFile;
        return new self($config);
    }

    public function get(string $path, mixed $default = null): mixed
    {
        $segments = explode('.', $path);
        $cursor = $this->values;
        foreach ($segments as $segment) {
            if (!is_array($cursor) || !array_key_exists($segment, $cursor)) {
                return $default;
            }
            $cursor = $cursor[$segment];
        }
        return $cursor;
    }

    public function all(): array
    {
        return $this->values;
    }
}

final class Database
{
    private PDO $pdo;

    public function __construct(private readonly Config $config)
    {
        $host = (string) $config->get('db.host');
        $port = (int) $config->get('db.port', 3306);
        $database = (string) $config->get('db.database');
        $charset = (string) $config->get('db.charset', 'utf8mb4');
        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $database, $charset);

        try {
            $this->pdo = new PDO($dsn, (string) $config->get('db.username'), (string) $config->get('db.password'), [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $exception) {
            throw new RuntimeException('Could not connect to the CMS database: ' . $exception->getMessage(), 0, $exception);
        }
    }

    public function pdo(): PDO
    {
        return $this->pdo;
    }

    public function all(string $sql, array $params = []): array
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->fetchAll() ?: [];
    }

    public function one(string $sql, array $params = []): ?array
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        $row = $statement->fetch();
        return $row === false ? null : $row;
    }

    public function scalar(string $sql, array $params = []): mixed
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->fetchColumn();
    }

    public function execute(string $sql, array $params = []): int
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->rowCount();
    }

    public function insert(string $sql, array $params = []): int
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return (int) $this->pdo->lastInsertId();
    }

    public function transaction(callable $callback): mixed
    {
        $this->pdo->beginTransaction();
        try {
            $result = $callback($this);
            $this->pdo->commit();
            return $result;
        } catch (Throwable $throwable) {
            $this->pdo->rollBack();
            throw $throwable;
        }
    }
}

final class HttpRequest
{
    private ?array $jsonBody = null;

    public function __construct(
        public readonly string $method,
        public readonly string $path,
        public readonly array $query,
        public readonly array $headers,
        public readonly string $rawBody,
    ) {
    }

    public static function fromGlobals(): self
    {
        $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
        $uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
        $path = (string) parse_url($uri, PHP_URL_PATH);
        $headers = function_exists('getallheaders') ? (getallheaders() ?: []) : [];

        return new self(
            $method,
            $path,
            $_GET,
            array_change_key_case($headers, CASE_LOWER),
            (string) file_get_contents('php://input')
        );
    }

    public function json(): array
    {
        if ($this->jsonBody !== null) {
            return $this->jsonBody;
        }

        if ($this->rawBody === '') {
            $this->jsonBody = [];
            return $this->jsonBody;
        }

        $decoded = json_decode($this->rawBody, true);
        if (!is_array($decoded)) {
            throw new RuntimeException('Request body must be valid JSON.');
        }

        $this->jsonBody = $decoded;
        return $this->jsonBody;
    }

    public function bearerToken(): ?string
    {
        $header = $this->headers['authorization'] ?? '';
        if (!is_string($header) || !str_starts_with($header, 'Bearer ')) {
            return null;
        }
        return substr($header, 7);
    }
}

final class JsonResponse
{
    public static function send(array $payload, int $status = 200, array $headers = []): never
    {
        http_response_code($status);
        header('Content-Type: application/json');
        foreach ($headers as $key => $value) {
            header($key . ': ' . $value);
        }
        echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }
}

final class TokenAuth
{
    public function __construct(private readonly Database $database, private readonly Config $config)
    {
    }

    public function passwordHash(string $password): string
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    public function createSession(int $userId): string
    {
        $token = bin2hex(random_bytes(32));
        $expiresAt = (new DateTimeImmutable())
            ->modify('+' . (int) $this->config->get('auth.session_hours', 24) . ' hours')
            ->format('Y-m-d H:i:s');

        $this->database->insert(
            'INSERT INTO admin_sessions (user_id, token_hash, expires_at) VALUES (:user_id, :token_hash, :expires_at)',
            [
                ':user_id' => $userId,
                ':token_hash' => hash('sha256', $token),
                ':expires_at' => $expiresAt,
            ]
        );

        return $token;
    }

    public function revokeToken(?string $token): void
    {
        if (!$token) {
            return;
        }

        $this->database->execute(
            'UPDATE admin_sessions SET revoked_at = NOW() WHERE token_hash = :token_hash AND revoked_at IS NULL',
            [':token_hash' => hash('sha256', $token)]
        );
    }

    public function resolveUser(HttpRequest $request): ?array
    {
        $token = $request->bearerToken();
        if (!$token) {
            return null;
        }

        $session = $this->database->one(
            'SELECT s.id AS session_id, s.user_id, u.id, u.name, u.email, u.role, u.status, u.last_login_at, u.created_at, u.updated_at
             FROM admin_sessions s
             INNER JOIN users u ON u.id = s.user_id
             WHERE s.token_hash = :token_hash
               AND s.revoked_at IS NULL
               AND s.expires_at > NOW()
               AND u.status = :status
             LIMIT 1',
            [
                ':token_hash' => hash('sha256', $token),
                ':status' => 'active',
            ]
        );

        return $session ?: null;
    }
}

final class NodeRedService
{
    public function __construct(private readonly Config $config, private readonly Database $database)
    {
    }

    public function queue(
        string $flowName,
        string $triggerAction,
        string $entityType,
        ?int $entityId,
        array $input,
    ): array {
        $workflowId = $this->database->insert(
            'INSERT INTO workflow_runs (flow_name, trigger_action, entity_type, entity_id, status, input_json)
             VALUES (:flow_name, :trigger_action, :entity_type, :entity_id, :status, :input_json)',
            [
                ':flow_name' => $flowName,
                ':trigger_action' => $triggerAction,
                ':entity_type' => $entityType,
                ':entity_id' => $entityId,
                ':status' => 'queued',
                ':input_json' => json_encode($input, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            ]
        );

        $dispatch = $this->dispatch($workflowId, $flowName, $triggerAction, $entityType, $entityId, $input);

        return [
            'workflow_run_id' => $workflowId,
            'dispatch' => $dispatch,
        ];
    }

    public function dispatch(
        int $workflowId,
        string $flowName,
        string $triggerAction,
        string $entityType,
        ?int $entityId,
        array $input,
    ): array {
        $baseUrl = trim((string) $this->config->get('node_red.base_url', ''));
        if ($baseUrl === '') {
            return [
                'sent' => false,
                'reason' => 'node-red-not-configured',
            ];
        }

        $payload = json_encode([
            'workflow_run_id' => $workflowId,
            'flow_name' => $flowName,
            'trigger_action' => $triggerAction,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'input' => $input,
            'shared_secret' => (string) $this->config->get('node_red.shared_secret', ''),
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        $url = rtrim($baseUrl, '/') . '/cms/workflows';
        $timeout = max(1.0, ((int) $this->config->get('node_red.request_timeout_ms', 3000)) / 1000);
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => $timeout,
                'ignore_errors' => true,
            ],
        ]);

        $this->database->execute(
            'UPDATE workflow_runs SET status = :status, started_at = NOW() WHERE id = :id',
            [':status' => 'running', ':id' => $workflowId]
        );

        $response = @file_get_contents($url, false, $context);
        if ($response === false) {
            $this->database->execute(
                'UPDATE workflow_runs SET status = :status, error_text = :error_text, finished_at = NOW() WHERE id = :id',
                [
                    ':status' => 'failed',
                    ':error_text' => 'Could not contact Node-RED',
                    ':id' => $workflowId,
                ]
            );

            return [
                'sent' => false,
                'reason' => 'node-red-request-failed',
            ];
        }

        return [
            'sent' => true,
            'response' => json_decode($response, true) ?: ['raw' => $response],
        ];
    }
}

function normalize_slug(string $value): string
{
    $slug = strtolower(trim($value));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?: '';
    return trim($slug, '-') ?: 'item';
}

function json_decode_array(mixed $value): array
{
    if ($value === null || $value === '') {
        return [];
    }

    if (is_array($value)) {
        return $value;
    }

    $decoded = json_decode((string) $value, true);
    return is_array($decoded) ? $decoded : [];
}

function media_public_url(Config $config, string $absolutePath, ?string $providedPublicUrl = null): string
{
    if ($providedPublicUrl && preg_match('/^https?:\/\//i', $providedPublicUrl)) {
        return $providedPublicUrl;
    }

    $siteRoot = rtrim((string) $config->get('app.site_root'), '/');
    $baseUrl = rtrim(
        (string) ($providedPublicUrl !== null && trim($providedPublicUrl) !== ''
            ? $providedPublicUrl
            : $config->get('app.public_media_base_url', '/images')),
        '/'
    );
    $normalized = str_replace('\\', '/', $absolutePath);

    if (str_starts_with($normalized, $siteRoot . '/images/')) {
        $relative = substr($normalized, strlen($siteRoot . '/images'));
        return $baseUrl . $relative;
    }

    if ($providedPublicUrl) {
        return str_starts_with($providedPublicUrl, '/') ? $providedPublicUrl : '/' . ltrim($providedPublicUrl, '/');
    }

    return $baseUrl . '/' . rawurlencode(basename($absolutePath));
}

function normalize_media_path(Config $config, string $path): string
{
    $path = trim($path);
    if ($path === '') {
        throw new RuntimeException('Path is required.');
    }

    $normalized = str_replace('\\', '/', $path);
    $siteRoot = rtrim((string) $config->get('app.site_root'), '/');
    $mediaRoot = rtrim((string) $config->get('app.media_root'), '/');

    if (preg_match('/^https?:\/\//i', $normalized)) {
        $parsed = parse_url($normalized, PHP_URL_PATH);
        if (!is_string($parsed)) {
            throw new RuntimeException('Invalid media URL.');
        }
        $normalized = $parsed;
    }

    if (str_starts_with($normalized, '/images/')) {
        return $mediaRoot . substr($normalized, strlen('/images'));
    }

    if (str_starts_with($normalized, $siteRoot . '/')) {
        return $normalized;
    }

    if (str_starts_with($normalized, $mediaRoot . '/')) {
        return $normalized;
    }

    throw new RuntimeException('Path must be inside the Bluehost site root or the /images public path.');
}
