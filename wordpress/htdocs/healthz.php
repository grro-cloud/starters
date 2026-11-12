<?php
// Grro's readiness check: answers without touching the database, so the
// app can start before a database is attached.
header('Content-Type: text/plain');
header('Cache-Control: no-store');
echo "ok\n";
