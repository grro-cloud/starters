# Go + Gin

A small Gin web server in Go: a landing page, a JSON endpoint, a health check and graceful
shutdown. It compiles to one static binary, so cold starts are very fast.

## Run locally

Needs Go 1.26 or newer.

```sh
PORT=8080 go run .
```

Tests: `go test ./...`.

## Deploy on Grro

Pick **Go + Gin** in the Grro template catalogue, or create a project from
`https://github.com/grrocloud/starters` with path `go-gin` and the `base` builder.
Grro builds it with Paketo Go (`go build` of this folder) and runs the binary. Health check:
`/healthz`.

| Variable | Required | What it does |
| --- | --- | --- |
| `PORT` | set by Grro | Port to listen on, default 8080. |
| `GIN_MODE` | no | `debug` for verbose route logs. Release mode by default. |

## Where to edit

- `main.go`: routes live in `newRouter()`.
- `main_test.go`: tests using `httptest`.
- `go.mod`: module path and Go version. Change the module path to your own repo if you like.

## Use this folder on its own

```sh
npx degit grrocloud/starters/go-gin my-api
```
