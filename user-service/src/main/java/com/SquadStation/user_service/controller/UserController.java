package com.SquadStation.user_service.controller;

import com.SquadStation.user_service.dto.Request.LoginRequest;
import com.SquadStation.user_service.dto.Request.RefreshTokenRequest;
import com.SquadStation.user_service.dto.Request.SignupRequest;
import com.SquadStation.user_service.dto.Request.VerifyOtpRequest;
import com.SquadStation.user_service.dto.Response.AuthResponse;
import com.SquadStation.user_service.dto.Response.UserResponseDTO;
import com.SquadStation.user_service.entity.RefreshToken;
import com.SquadStation.user_service.entity.User;
import com.SquadStation.user_service.security.JwtService;
import com.SquadStation.user_service.services.OtpService;
import com.SquadStation.user_service.services.RefreshTokenService;
import com.SquadStation.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final OtpService otpService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @GetMapping("/me")
    public UserResponseDTO getMe(Authentication authentication) {
        User user = userService.getByCollegeEmail(authentication.getName());
        return UserResponseDTO.fromEntity(user);
    }
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request){
        otpService.signup(request);
        return "OTP sent to your college email - verify to complete signup";
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        otpService.login(request.collegeEmail());
        return "OTP sent (check console for now)";
    }
    @PostMapping("/verify-otp")
    public AuthResponse verifyOtp(@RequestBody VerifyOtpRequest request){
        otpService.verifyOtp(request.collegeEmail(), request.otp());

        User user = userService.getByCollegeEmail(request.collegeEmail());
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getCollegeEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return new AuthResponse(accessToken, refreshToken.getToken());
    }
    @PostMapping("/refresh-token")
    public AuthResponse refreshToken(@RequestBody
                                     RefreshTokenRequest request){
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(request.refreshToken());
        User user = userService.getById(refreshToken.getId());
        String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getCollegeEmail());
        return new AuthResponse(newAccessToken, refreshToken.getToken());
    }
    @PostMapping("/logout")
    public String logout(@RequestBody RefreshTokenRequest request){
        refreshTokenService.revokeToken(request.refreshToken());
        return "Logged out successfully";
    }




}
