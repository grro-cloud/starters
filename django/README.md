# Django

A Django 5.2 LTS project ready for Grro: gunicorn, WhiteNoise for static files, settings from
environment variables, SQLite in `/tmp` by default and an optional `DATABASE_URL`.
Migrations run on every start.

## Run locally

Needs Python 3.12 or newer.

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
DEBUG=1 python manage.py migrate
DEBUG=1 python manage.py runserver 8080
```

To run it the way Grro does: `SECRET_KEY=change-me PORT=8080 ./start.sh`.

Tests: `DEBUG=1 python manage.py test tests`.

## Deploy on Grro

Pick **Django** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `django` and the `base` builder.
Grro builds it with Paketo Python. The `Procfile` runs `start.sh`, which applies migrations
and starts gunicorn on `$PORT`. Health check: `/healthz`.

| Variable | Required | What it does |
| --- | --- | --- |
| `SECRET_KEY` | yes | Django secret key. The Grro template generates one per deploy. If it is missing and `DEBUG` is off, the app refuses to start. With `DEBUG=1` a random key is made at boot and a warning is printed. |
| `DATABASE_URL` | no | For example `postgres://user:pass@host:5432/db`. Without it, SQLite at `/tmp/db.sqlite3` is used. That file is wiped on every restart, so use a real database for anything you want to keep. |
| `DEBUG` | no | `1` turns on debug mode. Off by default. |
| `ALLOWED_HOSTS` | no | Comma separated host names. Defaults to `*`. |
| `CSRF_TRUSTED_ORIGINS` | no | Comma separated origins such as `https://app.example.com`, needed for forms on custom domains. |
| `WEB_CONCURRENCY` | no | Number of gunicorn workers, default 2. |
| `PORT` | set by Grro | Port to listen on, default 8080. |

The Paketo base run image has no system SQLite library, so `requirements.txt` adds
`pysqlite3-binary` (x86_64 only) and `config/settings.py` uses it in place of the built in
`sqlite3` module. With Postgres through `DATABASE_URL` you can drop it.

## Where to edit

- `config/views.py` and `config/urls.py`: pages and routes. Add your own apps with `python manage.py startapp`.
- `templates/` and `static/`: HTML and CSS.
- `config/settings.py`: settings, all read from the environment.
- `start.sh`: what runs on boot. `Procfile` points to it.
- `requirements.txt`: pinned dependencies (`pip freeze > requirements.txt` after changes).

## Use this folder on its own

```sh
npx degit grro-cloud/starters/django my-site
```
