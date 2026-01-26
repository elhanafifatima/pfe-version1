package com.pfe.client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       // http.csrf(csrf -> csrf.disable())
         //   .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

            http
            .csrf().disable() // disable CSRF for testing
            .authorizeHttpRequests()
                .anyRequest().permitAll()
            .and()
            .cors(); // enable CORS

        return http.build();
    }
}
