<?php
/**
 * WordPress settings for Grro Cloud, read from environment variables.
 *
 * Database: DATABASE_URL (mysql://user:password@host:3306/name), which Grro
 * sets when you attach a managed MySQL database, or WORDPRESS_DB_HOST,
 * WORDPRESS_DB_USER, WORDPRESS_DB_PASSWORD and WORDPRESS_DB_NAME.
 * Keys and salts: AUTH_KEY ... NONCE_SALT (the template generates them).
 */

function grro_env(string $key, string $default = ''): string {
    $v = getenv($key);
    return ($v === false || $v === '') ? $default : $v;
}

$db = ['host' => grro_env('WORDPRESS_DB_HOST'), 'user' => grro_env('WORDPRESS_DB_USER'),
       'pass' => grro_env('WORDPRESS_DB_PASSWORD'), 'name' => grro_env('WORDPRESS_DB_NAME')];
if ($url = grro_env('DATABASE_URL')) {
    $u = parse_url($url);
    if ($u !== false && in_array($u['scheme'] ?? '', ['mysql', 'mariadb'], true)) {
        $db['host'] = ($u['host'] ?? 'localhost') . (isset($u['port']) ? ':' . $u['port'] : '');
        $db['user'] = urldecode($u['user'] ?? '');
        $db['pass'] = urldecode($u['pass'] ?? '');
        $db['name'] = ltrim($u['path'] ?? '', '/');
    }
}

if ($db['host'] === '' || $db['name'] === '') {
    http_response_code(503);
    header('Content-Type: text/html; charset=utf-8');
    header('Retry-After: 60');
    echo '<!doctype html><title>Connect a database</title><body style="font-family:sans-serif;max-width:40em;margin:4em auto">'
       . '<h1>Almost there</h1><p>This WordPress site needs a MySQL database. In Grro, open this project, '
       . 'create a MySQL database, attach it as <code>DATABASE_URL</code> and redeploy.</p></body>';
    exit;
}

define('DB_HOST', $db['host']);
define('DB_USER', $db['user']);
define('DB_PASSWORD', $db['pass']);
define('DB_NAME', $db['name']);
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');
$table_prefix = grro_env('WORDPRESS_TABLE_PREFIX', 'wp_');

foreach (['AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT'] as $k) {
    define($k, grro_env($k, hash('sha256', $k . DB_PASSWORD . DB_NAME)));
}

// Grro ends HTTPS at its edge and forwards plain HTTP.
if (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
$scheme = (($_SERVER['HTTPS'] ?? '') === 'on') ? 'https' : 'http';
$home = rtrim(grro_env('WP_HOME', isset($_SERVER['HTTP_HOST']) ? $scheme . '://' . $_SERVER['HTTP_HOST'] : ''), '/');
if ($home !== '') {
    define('WP_HOME', $home);
    define('WP_SITEURL', $home . '/wp');
}
define('FORCE_SSL_ADMIN', $scheme === 'https');

// Themes and plugins live with the code (wp-content in this folder). The
// filesystem resets on restart, so install plugins and themes through the
// repository, not the dashboard; uploads need a storage plugin (see README).
define('WP_CONTENT_DIR', __DIR__ . '/wp-content');
if ($home !== '') {
    define('WP_CONTENT_URL', $home . '/wp-content');
}
define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', grro_env('WORDPRESS_ALLOW_FILE_MODS') !== 'true');
define('AUTOMATIC_UPDATER_DISABLED', true);
define('WP_DEBUG', grro_env('WORDPRESS_DEBUG') === 'true');
define('WP_DEBUG_LOG', 'php://stderr');
define('WP_DEBUG_DISPLAY', false);

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/wp/');
}
require_once ABSPATH . 'wp-settings.php';
