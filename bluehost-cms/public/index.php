<?php
declare(strict_types=1);

$rootPath = dirname(__DIR__);

require $rootPath . '/src/Support.php';
require $rootPath . '/src/Controllers.php';

$config = Config::load($rootPath);
$request = HttpRequest::fromGlobals();
$application = new CmsApiApplication($config);
$application->run($request);
