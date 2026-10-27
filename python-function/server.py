"""Tiny HTTP server that calls handler() from main.py.

Uses only the Python standard library, so there is nothing to install.
You normally do not need to edit this file.
"""

import json
import os
import sys
import traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

from main import handler

MAX_BODY = 10 * 1024 * 1024  # 10 MiB


def to_response(result):
    status, headers = 200, {}
    if isinstance(result, tuple):
        if len(result) == 3:
            status, result, headers = result
        else:
            status, result = result
    if isinstance(result, (dict, list)):
        body = json.dumps(result).encode()
        headers.setdefault("Content-Type", "application/json")
    elif isinstance(result, bytes):
        body = result
        headers.setdefault("Content-Type", "application/octet-stream")
    else:
        body = str(result if result is not None else "").encode()
        headers.setdefault("Content-Type", "text/plain; charset=utf-8")
    return int(status), body, headers


class Handler(BaseHTTPRequestHandler):
    server_version = "grro-python-function"

    def _serve(self):
        url = urlsplit(self.path)
        length = min(int(self.headers.get("Content-Length") or 0), MAX_BODY)
        request = {
            "method": self.command,
            "path": url.path,
            "query": parse_qs(url.query),
            "headers": {k.lower(): v for k, v in self.headers.items()},
            "body": self.rfile.read(length) if length else b"",
        }
        try:
            status, body, headers = to_response(handler(request))
        except Exception:
            traceback.print_exc()
            status, body, headers = 500, b'{"error":"internal error"}', {"Content-Type": "application/json"}
        self.send_response(status)
        for key, value in headers.items():
            self.send_header(key, value)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    do_GET = do_POST = do_PUT = do_PATCH = do_DELETE = do_HEAD = do_OPTIONS = _serve

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))


def main():
    port = int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Listening on http://0.0.0.0:{port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
