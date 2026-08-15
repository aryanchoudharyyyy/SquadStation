package com.SquadStation.user_service.dto.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(@NotBlank @Email @Size(max = 254) String collegeEmail) {
}
