package com.CollegeTravel.user_service.services;

import com.CollegeTravel.user_service.entity.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(Long userId);
    RefreshToken validateRefreshToken(String token);
    void revokeToken(String token);
}
