<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel on Grro</title>
    <style>
        :root { color-scheme: light dark; font-family: system-ui, sans-serif; line-height: 1.5; }
        body { margin: 0; }
        main { max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }
        code { font-size: 0.95em; }
    </style>
</head>
<body>
    <main>
        <h1>Laravel is running on Grro</h1>
        <p>Laravel {{ app()->version() }} on PHP {{ PHP_VERSION }}. Edit <code>resources/views/welcome.blade.php</code>
        to change this page and <code>routes/web.php</code> to add routes. Try <a href="/api/hello?name=Ada">/api/hello</a>.</p>
    </main>
</body>
</html>
