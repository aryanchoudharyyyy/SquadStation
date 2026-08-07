package com.SquadStation.user_service.config;

import com.SquadStation.user_service.security.InternalApiKeyFilter;
import com.SquadStation.user_service.security.JwtAuthFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private  final JwtAuthFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, InternalApiKeyFilter internalApiKeyFilter) throws Exception{
        http.csrf(csrf -> csrf.disable())
                .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth-> auth.requestMatchers
                                        ("/api/users/signup", "/api/users/login","/api/users/verify-otp" ,
                                                "/api/users/refresh-token"
                                        ,"/swagger-ui/**","/v3/api-docs/**")
                        .permitAll()
                                .requestMatchers("/api/internal/**").hasRole("INTERNAL_SERVICE")
                                .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(internalApiKeyFilter, JwtAuthFilter.class);

                return http.build();

    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
