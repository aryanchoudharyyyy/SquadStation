package com.SquadStation.user_service.dto.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 254) String collegeEmail,
        @NotBlank @Size(max = 100) String branch,
        @NotBlank @Size(max = 20) String year
) {
}
