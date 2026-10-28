import os

from flask import Flask, jsonify, render_template, request
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
# Grro's router sits in front of the app and sets X-Forwarded-For and X-Forwarded-Proto.
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/api/hello")
def hello():
    name = request.args.get("name", "there")[:100]
    return jsonify(message=f"Hello {name}, from Flask on Grro.", region=os.environ.get("GRRO_REGION", "local"))
