import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="FastAPI on Grro")


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse)
def index():
    return """<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>FastAPI on Grro</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5}</style>
</head>
<body>
<h1>FastAPI is running on Grro</h1>
<p>Edit <code>main.py</code> to change this page. Try <a href="/api/hello?name=Ada">/api/hello</a> or the docs at <a href="/docs">/docs</a>.</p>
</body>
</html>"""


@app.get("/api/hello")
def hello(name: str = "there"):
    return {"message": f"Hello {name}, from FastAPI on Grro.", "region": os.environ.get("GRRO_REGION", "local")}
