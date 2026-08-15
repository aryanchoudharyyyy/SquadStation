package com.SquadStation.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications")
@Data
@NoArgsConstructor
public class OtpVerification {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String collegeEmail;
    @Column(nullable = false)
    private String otpHash;

    @Column(nullable = false)
    private int failedAttempts = 0;

    private LocalDateTime lastSentAt;

    @Column(nullable = false)
    private int requestsInWindow = 0;

    private LocalDateTime requestWindowStartedAt;
    private LocalDateTime expiresAt;

}
