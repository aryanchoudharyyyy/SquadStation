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

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private static final long REFRESH_TOKEN_VALID_DAYS=30;
    // Helper method to hash the token before DB storage
    public String hashToken(String token){
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes());
            return Base64.getEncoder().encodeToString(hash);

        } catch (NoSuchAlgorithmException e) {
            throw  new RuntimeException("Failed to hash token", e);

        }
    }
    @Override
    public RefreshToken createRefreshToken(Long userId){
        String rawToken = jwtService.generateRefreshToken();
        String hashedToken = hashToken(rawToken);
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                        .orElse(new RefreshToken());


        refreshToken.setToken(hashedToken);
        refreshToken.setUserId(userId);
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(REFRESH_TOKEN_VALID_DAYS));
        refreshTokenRepository.save(refreshToken);
        // We must return a transient object with the RAW token back to the controller
        // so it can be sent to the user. The DB safely holds the hash.
        RefreshToken returnToken = new RefreshToken();
        returnToken.setToken(rawToken);
        returnToken.setUserId(userId);
        returnToken.setExpiresAt(refreshToken.getExpiresAt());
        return returnToken;


    }
    @Override
    public RefreshToken validateRefreshToken(String token){
        String hashedToken = hashToken(token);
        RefreshToken refreshToken = refreshTokenRepository.findByToken(hashedToken)
                .orElseThrow(()->new RefreshTokenNotFoundException("Refresh token not found"));
        if(refreshToken.getExpiresAt().isBefore(LocalDateTime.now())){
            refreshTokenRepository.delete(refreshToken);
            throw new RefreshTokenExpiredException("Refresh token expired, please login again");

        }
        return refreshToken;

    }
    @Override
    public void revokeToken(String token){
        String hashedToken = hashToken(token);
        refreshTokenRepository.findByToken(hashedToken).ifPresent(refreshTokenRepository::delete);
    }
}
