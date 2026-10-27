<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Grro runs the app with a read only code folder; only /tmp is writable.
// Keep everything Laravel writes at runtime (storage, compiled views, file cache,
// sessions, bootstrap caches and the default SQLite database) in one folder there.
$writable = rtrim(getenv('LARAVEL_WRITABLE_PATH') ?: sys_get_temp_dir().'/laravel', '/');

foreach ([
    'storage/app/public',
    'storage/framework/cache/data',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
    'bootstrap-cache',
] as $dir) {
    is_dir("{$writable}/{$dir}") || @mkdir("{$writable}/{$dir}", 0700, true);
}
is_file("{$writable}/storage/database.sqlite") || @touch("{$writable}/storage/database.sqlite");

foreach ([
    'APP_SERVICES_CACHE' => 'services.php',
    'APP_PACKAGES_CACHE' => 'packages.php',
    'APP_CONFIG_CACHE' => 'config.php',
    'APP_ROUTES_CACHE' => 'routes-v7.php',
    'APP_EVENTS_CACHE' => 'events.php',
] as $key => $file) {
    if (getenv($key) === false) {
        $path = "{$writable}/bootstrap-cache/{$file}";
        putenv("{$key}={$path}");
        $_ENV[$key] = $_SERVER[$key] = $path;
    }
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/healthz',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Grro's router sits in front of the app and terminates TLS.
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create()
    ->useStoragePath("{$writable}/storage");
