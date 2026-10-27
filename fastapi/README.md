# FastAPI

A small FastAPI app served by uvicorn. It has a landing page, a JSON endpoint and the automatic
API docs at `/docs`.

## Run locally

Needs Python 3.12 or newer.

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
PORT=8080 uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

Open http://localhost:8080 and http://localhost:8080/docs.

Tests: `python -m unittest -v` (starts uvicorn and calls the endpoints).

## Deploy on Grro

Pick **FastAPI** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `fastapi` and the `base` builder.
Grro builds it with Paketo Python. The `Procfile` starts
`uvicorn main:app --host 0.0.0.0 --port $PORT`. Health check: `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `main.py`: routes and pages.
- `requirements.txt`: pinned dependencies. After adding a package, run `pip freeze > requirements.txt`.
- `Procfile`: the start command.
- `project.toml`: buildpack settings (Python version).

## Use this folder on its own

```sh
npx degit grrocloud/starters/fastapi my-api
```
