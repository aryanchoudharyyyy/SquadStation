package com.SquadStation.user_service.services;

import com.SquadStation.user_service.entity.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(Long userId);
    RefreshToken validateRefreshToken(String token);
    void revokeToken(String token);
}
