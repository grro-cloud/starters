#!/usr/bin/env sh
# Starts the server, checks /healthz and /, then stops it.
set -eu
PORT="${PORT:-18080}"
cd "$(dirname "$0")"
PORT="$PORT" python3 server.py & PID=$!
trap 'kill $PID 2>/dev/null' EXIT
for i in $(seq 1 50); do curl -fsS "http://127.0.0.1:$PORT/healthz" >/dev/null 2>&1 && break; sleep 0.1; done
curl -fsS "http://127.0.0.1:$PORT/healthz"; echo
curl -fsS "http://127.0.0.1:$PORT/" | grep -q Grro && echo "smoke ok"
