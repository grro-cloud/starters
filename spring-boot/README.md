# Spring Boot

A Spring Boot 4.1 web app on Java 21 with Maven: a static landing page, a JSON endpoint and the
actuator health check mapped to `/healthz`. The Maven wrapper is included, so you only need a JDK.

## Run locally

Needs Java 21 or newer.

```sh
PORT=8080 ./mvnw spring-boot:run
```

Or build the jar and run it: `./mvnw package && PORT=8080 java -jar target/starter-0.0.1-SNAPSHOT.jar`.

Tests: `./mvnw test` (starts the app on a random port and calls it).

## Deploy on Grro

Pick **Spring Boot** in the Grro template catalogue, or create a project from
`https://github.com/grro-cloud/starters` with path `spring-boot` and the `base` builder.
Grro builds it with Paketo Java: `./mvnw package` with Java 21 (`BP_JVM_VERSION` in
`project.toml`), then it runs the jar with a memory calculator that sizes the JVM to the
container. Health check: `/healthz`.

| Variable | Required | What it does |
| --- | --- | --- |
| `PORT` | set by Grro | Port to listen on, default 8080 (`server.port=${PORT:8080}`). |

Any Spring property can also be set from the environment, for example
`SPRING_MAIN_LAZY_INITIALIZATION=true` for faster cold starts.

## Where to edit

- `src/main/java/com/usegrro/starter/`: controllers and the application class.
- `src/main/resources/static/`: static files, including the landing page.
- `src/main/resources/application.properties`: port, health check path and other settings.
- `pom.xml`: dependencies. `.mvn/wrapper/maven-wrapper.properties` pins the Maven version.

## Use this folder on its own

```sh
npx degit grro-cloud/starters/spring-boot my-app
```
