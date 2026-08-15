package com.SquadStation.user_service.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;

    private static final long ACCESS_TOKEN_EXPIRATION_MS= 30* 60*1000;
    public String generateAccessToken(Long userId, String collegeEmail){
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .subject(collegeEmail)
                .claim("userId",userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+ACCESS_TOKEN_EXPIRATION_MS))
                .signWith(key)
                .compact();


    }
    public String generateRefreshToken(){
        return UUID.randomUUID().toString();

    }
}
