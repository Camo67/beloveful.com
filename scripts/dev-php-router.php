<?php
declare(strict_types=1);

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
if (preg_match('#^/api(?:/.*)?$#', $requestPath)) {
    require __DIR__ . '/../bluehost/public_html/api/index.php';
    return true;
}

return false;
