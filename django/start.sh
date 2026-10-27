#!/usr/bin/env bash
# Runs database migrations, then starts gunicorn on $PORT.
set -euo pipefail
python manage.py migrate --noinput
exec gunicorn config.wsgi \
  --bind "0.0.0.0:${PORT:-8080}" \
  --workers "${WEB_CONCURRENCY:-2}" \
  --access-logfile - \
  --forwarded-allow-ips '*' \
  --control-socket /tmp/gunicorn.ctl
