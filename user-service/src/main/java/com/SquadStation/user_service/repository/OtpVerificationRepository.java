package com.SquadStation.user_service.repository;

import com.SquadStation.user_service.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification,Long> {
    Optional<OtpVerification> findByCollegeEmail(String collegeEmail);
    void deleteByExpiresAtBefore(LocalDateTime time);
}
