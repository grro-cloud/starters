# Flask

A small Flask 3 app served by gunicorn. It has a landing page from a Jinja template,
a JSON endpoint and a health check.

## Run locally

Needs Python 3.12 or newer.

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
flask --app app run --debug --port 8080
```

Open http://localhost:8080. Tests: `python -m unittest -v` (uses Flask's test client).

## Deploy on Grro

Pick **Flask** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `flask` and the `base` builder.
Grro builds it with Paketo Python. The `Procfile` starts gunicorn on `0.0.0.0:$PORT`
with two workers. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). `WEB_CONCURRENCY` changes
the number of gunicorn workers. Nothing else is required.

## Where to edit

- `app.py`: routes.
- `templates/`: Jinja templates. `static/`: CSS, images and scripts.
- `requirements.txt`: pinned dependencies. After adding a package, run `pip freeze > requirements.txt`.
- `Procfile`: the start command.
- `project.toml`: buildpack settings (Python version).

## Use this folder on its own

```sh
npx degit grro-cloud/starters/flask my-app
```
