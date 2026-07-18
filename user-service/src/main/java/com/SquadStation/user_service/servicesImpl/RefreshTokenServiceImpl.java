package com.SquadStation.user_service.servicesImpl;

import com.SquadStation.user_service.entity.RefreshToken;
import com.SquadStation.user_service.exception.RefreshTokenExpiredException;
import com.SquadStation.user_service.exception.RefreshTokenNotFoundException;
import com.SquadStation.user_service.repository.RefreshTokenRepository;
import com.SquadStation.user_service.security.JwtService;
import com.SquadStation.user_service.services.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private static final long REFRESH_TOKEN_VALID_DAYS=30;
    @Override
    public RefreshToken createRefreshToken(Long userId){
        refreshTokenRepository.deleteByUserId(userId);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(jwtService.generateRefreshToken());
        refreshToken.setUserId(userId);
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(REFRESH_TOKEN_VALID_DAYS));
        return refreshTokenRepository.save(refreshToken);

    }
    @Override
    public RefreshToken validateRefreshToken(String token){
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(()->new RefreshTokenNotFoundException("Refresh token not found"));
        if(refreshToken.getExpiresAt().isBefore(LocalDateTime.now())){
            refreshTokenRepository.delete(refreshToken);
            throw new RefreshTokenExpiredException("Refresh token expired, please login again");

        }
        return refreshToken;

    }
    @Override
    public void revokeToken(String token){
        refreshTokenRepository.findByToken(token).ifPresent(refreshTokenRepository::delete);
    }
}
