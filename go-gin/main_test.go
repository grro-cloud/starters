package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func get(t *testing.T, path string) *httptest.ResponseRecorder {
	t.Helper()
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	newRouter().ServeHTTP(w, httptest.NewRequest(http.MethodGet, path, nil))
	return w
}

func TestHealthz(t *testing.T) {
	if w := get(t, "/healthz"); w.Code != http.StatusOK {
		t.Fatalf("want 200, got %d", w.Code)
	}
}

func TestIndex(t *testing.T) {
	w := get(t, "/")
	if w.Code != http.StatusOK || !strings.Contains(w.Body.String(), "running on Grro") {
		t.Fatalf("unexpected response: %d %s", w.Code, w.Body.String())
	}
}

func TestHello(t *testing.T) {
	if w := get(t, "/api/hello?name=Ada"); !strings.Contains(w.Body.String(), "Ada") {
		t.Fatalf("unexpected body: %s", w.Body.String())
	}
}
