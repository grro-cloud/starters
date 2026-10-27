"""Run with: DEBUG=1 python manage.py test tests"""

from django.test import TestCase


class SmokeTest(TestCase):
    def test_healthz(self):
        response = self.client.get("/healthz")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"ok")

    def test_index(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "running on Grro")

    def test_static_served(self):
        response = self.client.get("/static/style.css")
        self.assertEqual(response.status_code, 200)
