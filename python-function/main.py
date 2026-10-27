"""Your function lives here.

Grro calls handler(request) for every HTTP request. The request is a dict:

    {
        "method": "GET",
        "path": "/hello",
        "query": {"name": ["Ada"]},
        "headers": {"content-type": "application/json", ...},
        "body": b"...",
    }

Return one of:
    - a dict or list (sent as JSON with status 200)
    - a str (sent as plain text with status 200)
    - a tuple (status, body) or (status, body, headers)
"""

import os


def handler(request):
    path = request["path"]

    if path == "/healthz":
        return {"status": "ok"}

    if path == "/":
        name = request["query"].get("name", ["there"])[0]
        return {
            "message": f"Hello {name}, this Python function is running on Grro.",
            "method": request["method"],
            "region": os.environ.get("GRRO_REGION", "local"),
        }

    return 404, {"error": "not found", "path": path}
