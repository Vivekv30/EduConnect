package com.stdtc.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Set the URL pattern for which CORS should be configured
				.allowedOriginPatterns("*") // Allow all origins
				.allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
				.allowCredentials(true) // Enable if dealing with cookies or authentication
				.maxAge(3600); // Max age of the CORS pre-flight response cache
	}
}
