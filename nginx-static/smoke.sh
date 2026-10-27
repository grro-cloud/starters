#!/usr/bin/env sh
# Serves public/ with Python's built in web server and checks /healthz and /.
set -eu
PORT="${PORT:-18080}"
cd "$(dirname "$0")"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory public >/dev/null 2>&1 & PID=$!
trap 'kill $PID 2>/dev/null' EXIT
for i in $(seq 1 50); do curl -fsS "http://127.0.0.1:$PORT/healthz" >/dev/null 2>&1 && break; sleep 0.1; done
test "$(curl -fsS "http://127.0.0.1:$PORT/healthz")" = "ok"
curl -fsS "http://127.0.0.1:$PORT/" | grep -q "running on Grro"
curl -fsS "http://127.0.0.1:$PORT/style.css" >/dev/null
echo "smoke ok"
