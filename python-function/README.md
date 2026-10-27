# Python function

A single Python function that answers HTTP requests. You write `handler(request)` in `main.py`
and a tiny server built on the Python standard library calls it. No framework, no dependencies,
fast cold starts.

## Run locally

Needs Python 3.12 or newer.

```sh
PORT=8080 python3 server.py
curl http://localhost:8080/healthz
curl "http://localhost:8080/?name=Ada"
```

Tests: `python3 -m unittest -v` or `./smoke.sh`.

## Deploy on Grro

Pick **Python function** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `python-function` and the `base` builder.
Grro builds it with Paketo Python, sets `PORT`, and checks `/healthz`.

Environment variables: `PORT` (set by Grro, defaults to 8080). Nothing else is required.

## Where to edit

- `main.py`: your function. The docstring at the top shows the request shape and what you can return.
- `requirements.txt`: add pinned packages here if you need any.
- `server.py`: the small HTTP server. You rarely need to touch it.
- `project.toml`: buildpack settings (Python version).

## Use this folder on its own

```sh
npx degit grro-cloud/starters/python-function my-function
```
