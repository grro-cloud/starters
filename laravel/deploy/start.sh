#!/usr/bin/env bash
# Starts php-fpm and nginx on $PORT. Both configs are written to /tmp first,
# so the app runs as any user id with a read only app folder.
set -euo pipefail
cd "$(dirname "$0")/.."

run="${TMPDIR:-/tmp}/grro-php"
mkdir -p "$run"
for conf in nginx.conf php-fpm.conf; do
  sed -e "s#__PORT__#${PORT:-8080}#g" -e "s#__APP__#${PWD}#g" -e "s#__RUN__#${run}#g" \
    "deploy/${conf}" > "${run}/${conf}"
done

php-fpm --nodaemonize --fpm-config "${run}/php-fpm.conf" &
nginx -p "${run}/" -e stderr -c "${run}/nginx.conf" &

# Stop both on SIGTERM, and stop the container if either one exits.
trap 'kill -TERM $(jobs -p) 2>/dev/null || true' TERM INT
wait -n || true
kill -TERM $(jobs -p) 2>/dev/null || true
wait
