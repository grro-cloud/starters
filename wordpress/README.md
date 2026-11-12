# WordPress starter for Grro Cloud

WordPress installed with Composer, served by nginx and PHP-FPM through the
Paketo PHP buildpack (Grro builder `full`). It runs as a non-root user,
listens on `$PORT` and reads every setting from environment variables.

## Layout

| Path | What |
|---|---|
| `composer.json` | WordPress core (`johnpbloch/wordpress-core`), installed into `htdocs/wp` at build |
| `htdocs/wp-config.php` | Settings from the environment (database, keys, site address) |
| `htdocs/wp-content/` | Your themes, plugins and must-use plugins, kept in Git |
| `htdocs/healthz.php` | Readiness check for Grro (no database needed) |
| `.nginx.conf.d/` | Pretty permalinks and blocked files |
| `project.toml` | Buildpack settings |

## Database

Create a MySQL database in the Grro project and attach it as `DATABASE_URL`
(`mysql://user:password@host:3306/name`). Or set `WORDPRESS_DB_HOST`,
`WORDPRESS_DB_USER`, `WORDPRESS_DB_PASSWORD` and `WORDPRESS_DB_NAME`.

## Things to know

- The filesystem resets when the app restarts. Add themes and plugins to
  `htdocs/wp-content` in Git (or with Composer from wpackagist), not from the
  WordPress dashboard. The dashboard's plugin installer is off unless
  `WORDPRESS_ALLOW_FILE_MODS=true`.
- Media uploads are lost on restart until you add a storage plugin that
  keeps them in object storage (for example an S3-compatible bucket).
- Keys and salts come from `AUTH_KEY` ... `NONCE_SALT`. Keep them stable, or
  everyone is signed out when they change.

## Run it on your computer

    composer install
    DATABASE_URL=mysql://root:secret@127.0.0.1:3306/wordpress php -S 127.0.0.1:8080 -t htdocs

## Publish as a Grro template

1. Push this folder to `github.com/grro-cloud/starters` as `wordpress/`.
2. In the backend repository run `scripts/publish-wordpress-template.sh <commit>`
   with that commit, then `make templates-check`.
