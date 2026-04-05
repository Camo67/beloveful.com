<?php
declare(strict_types=1);

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$documentRoot = rtrim($_SERVER['DOCUMENT_ROOT'] ?? '', DIRECTORY_SEPARATOR);
$resolvedPath = $documentRoot . $requestPath;

if ($requestPath !== '/' && is_file($resolvedPath)) {
    return false;
}

if (preg_match('#^/api(?:/.*)?$#', $requestPath)) {
    require $documentRoot . '/api/index.php';
    return true;
}

http_response_code(200);
header('Content-Type: text/html; charset=UTF-8');
readfile($documentRoot . '/index.html');
return true;
