package com.usegrro.starter;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/api/hello")
	public Map<String, String> hello(@RequestParam(defaultValue = "there") String name) {
		return Map.of("message", "Hello " + name + ", from Spring Boot on Grro.");
	}

}
