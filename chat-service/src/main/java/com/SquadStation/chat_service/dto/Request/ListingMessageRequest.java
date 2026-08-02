package com.SquadStation.chat_service.dto.Request;

public record ListingMessageRequest(Long conversationId, String content) {
}
