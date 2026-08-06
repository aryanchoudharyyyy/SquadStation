package com.SquadStation.chat_service.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ListingMessageRequest(
        @NotNull Long conversationId,
        @NotBlank @Size(max = 1000) String content
) {
}
