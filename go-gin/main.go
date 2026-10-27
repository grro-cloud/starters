package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

const indexHTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gin on Grro</title>
  <style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5}</style>
</head>
<body>
  <h1>Gin is running on Grro</h1>
  <p>Edit <code>main.go</code> to change this page. Try <a href="/api/hello?name=Ada">/api/hello</a>.</p>
</body>
</html>`

// newRouter sets up all routes. Add yours here.
func newRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())
	_ = r.SetTrustedProxies(nil) // Grro's router sits in front; do not trust client sent X-Forwarded-For.

	r.GET("/", func(c *gin.Context) {
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(indexHTML))
	})
	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	r.GET("/api/hello", func(c *gin.Context) {
		name := c.DefaultQuery("name", "there")
		c.JSON(http.StatusOK, gin.H{"message": "Hello " + name + ", from Gin on Grro."})
	})
	return r
}

func main() {
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:              "0.0.0.0:" + port,
		Handler:           newRouter(),
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		log.Printf("Listening on http://0.0.0.0:%s", port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatal(err)
		}
	}()

	// Grro sends SIGTERM before stopping the container.
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, os.Interrupt)
	<-stop
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = srv.Shutdown(ctx)
}
