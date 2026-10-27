package com.usegrro.starter;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class StarterApplicationTests {

	@Value("${local.server.port}")
	int port;

	private final HttpClient http = HttpClient.newHttpClient();

	private HttpResponse<String> get(String path) throws Exception {
		HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + path)).build();
		return http.send(request, HttpResponse.BodyHandlers.ofString());
	}

	@Test
	void healthzIsUp() throws Exception {
		HttpResponse<String> response = get("/healthz");
		assertThat(response.statusCode()).isEqualTo(200);
		assertThat(response.body()).contains("\"status\":\"UP\"");
	}

	@Test
	void indexSaysGrro() throws Exception {
		HttpResponse<String> response = get("/");
		assertThat(response.statusCode()).isEqualTo(200);
		assertThat(response.body()).contains("running on Grro");
	}

	@Test
	void helloGreets() throws Exception {
		assertThat(get("/api/hello?name=Ada").body()).contains("Ada");
	}

}
