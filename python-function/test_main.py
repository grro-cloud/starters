import json
import os
import socket
import subprocess
import sys
import time
import unittest
import urllib.error
import urllib.request

from main import handler

HERE = os.path.dirname(os.path.abspath(__file__))


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def req(path, query=None):
    return {"method": "GET", "path": path, "query": query or {}, "headers": {}, "body": b""}


class HandlerTest(unittest.TestCase):
    def test_healthz(self):
        self.assertEqual(handler(req("/healthz")), {"status": "ok"})

    def test_root_mentions_grro(self):
        self.assertIn("Grro", handler(req("/", {"name": ["Ada"]}))["message"])

    def test_not_found(self):
        status, _ = handler(req("/nope"))
        self.assertEqual(status, 404)


class ServerTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = free_port()
        env = dict(os.environ, PORT=str(cls.port))
        cls.proc = subprocess.Popen([sys.executable, "server.py"], cwd=HERE, env=env)
        for _ in range(50):
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{cls.port}/healthz", timeout=1)
                return
            except OSError:
                time.sleep(0.1)
        raise RuntimeError("server did not start")

    @classmethod
    def tearDownClass(cls):
        cls.proc.terminate()
        cls.proc.wait()

    def test_http(self):
        with urllib.request.urlopen(f"http://127.0.0.1:{self.port}/") as r:
            self.assertEqual(r.status, 200)
            self.assertIn("Grro", json.load(r)["message"])
        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(f"http://127.0.0.1:{self.port}/missing")
        self.assertEqual(ctx.exception.code, 404)


if __name__ == "__main__":
    unittest.main()
