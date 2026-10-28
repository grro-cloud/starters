import unittest

from app import app


class AppTest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_healthz(self):
        res = self.client.get("/healthz")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json(), {"status": "ok"})

    def test_index(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        self.assertIn(b"running on Grro", res.data)

    def test_hello(self):
        res = self.client.get("/api/hello?name=Ada")
        self.assertIn("Ada", res.get_json()["message"])


if __name__ == "__main__":
    unittest.main()
