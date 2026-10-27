# Laravel

A Laravel 12 app set up for Grro: nginx and php-fpm, logs to stderr, and everything Laravel
writes at runtime (storage, compiled views, sessions, file cache, the SQLite database) kept in
`/tmp/laravel`. It has a landing page, a JSON route and `/healthz`.

Frontend tooling (Vite, npm) is left out to keep it small. Add it back if you need it, and run
the asset build before you commit, because the PHP builder does not run npm.

## Run locally

Needs PHP 8.2 or newer and Composer.

```sh
composer install
cp .env.example .env
php artisan key:generate
php artisan serve --port 8080
```

Tests: `php artisan test` (or `./vendor/bin/phpunit`).

Writable state lives in `/tmp/laravel` locally too. Set `LARAVEL_WRITABLE_PATH` to use another folder.

## Deploy on Grro

Pick **Laravel** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `laravel` and the **`full`** builder
(Paketo PHP needs the full stack). Health check: `/healthz`.

How the build works:

- Composer installs the locked packages without dev dependencies. PHP extensions listed as `ext-*`
  in `composer.json` are enabled when the buildpack finds them missing, and
  `.php.ini.d/grro-extensions.ini` turns on `mbstring`, `openssl` and `curl`.
- `project.toml` sets `BP_PHP_SERVER=nginx` and `BP_PHP_WEB_DIR=public`.
- The `Procfile` runs `deploy/start.sh`, which writes `deploy/nginx.conf` and
  `deploy/php-fpm.conf` to `/tmp` with the right port and starts php-fpm and nginx. This is
  what lets the app run as any user id with a read only app folder; the configs the buildpack
  generates are only readable by its own user group.

| Variable | Required | What it does |
| --- | --- | --- |
| `APP_KEY` | yes | Encryption key for sessions and cookies. Pages return 500 without it (only `/healthz` works). Generate one with `php artisan key:generate --show`, or let the Grro template fill in a random 32 character value. |
| `APP_ENV` | no | Defaults to `production`. |
| `APP_DEBUG` | no | `true` shows error details. Keep it off in production. |
| `APP_URL` | no | Your public URL, used when Laravel builds links. |
| `DB_CONNECTION`, `DB_URL` | no | Use a real database, for example `pgsql` and `postgres://user:pass@host:5432/db`. Without them, SQLite at `/tmp/laravel/storage/database.sqlite` is used and wiped on every restart. |
| `LOG_CHANNEL` | no | `stderr` by default, so logs show up in Grro. |
| `PORT` | set by Grro | Port nginx listens on, default 8080. |

Migrations do not run on start. With a real database, run `php artisan migrate --force` once
(for example from a one off job), or add it to `deploy/start.sh` before php-fpm starts.

## Where to edit

- `routes/web.php`: routes. `app/`: controllers, models and the rest of your code.
- `resources/views/welcome.blade.php`: the landing page.
- `config/`: settings. Defaults for sessions, cache, queue and logs are set for Grro.
- `bootstrap/app.php`: the `/healthz` route, trusted proxies and the `/tmp` paths.
- `deploy/`: nginx and php-fpm configs and the start script.

## Use this folder on its own

```sh
npx degit grrocloud/starters/laravel my-app
```
