import json
import os
import socket
import subprocess
import sys
import time
import unittest
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class AppTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = free_port()
        cls.proc = subprocess.Popen(
            [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", str(cls.port)],
            cwd=HERE,
        )
        for _ in range(100):
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

    def get(self, path):
        return urllib.request.urlopen(f"http://127.0.0.1:{self.port}{path}")

    def test_healthz(self):
        with self.get("/healthz") as r:
            self.assertEqual(r.status, 200)
            self.assertEqual(json.load(r), {"status": "ok"})

    def test_index(self):
        with self.get("/") as r:
            self.assertIn("running on Grro", r.read().decode())

    def test_hello(self):
        with self.get("/api/hello?name=Ada") as r:
            self.assertIn("Ada", json.load(r)["message"])


if __name__ == "__main__":
    unittest.main()
