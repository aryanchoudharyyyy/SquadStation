package com.SquadStation.chat_service.dto.Response;

import java.time.LocalDateTime;

public record ListingMessageResponse(Long id, Long conversationId, Long senderId, String content, LocalDateTime sentAt) {
}
