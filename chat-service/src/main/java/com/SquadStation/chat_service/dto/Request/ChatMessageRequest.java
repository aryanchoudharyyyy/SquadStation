package com.SquadStation.chat_service.dto.Request;

public record ChatMessageRequest(Long groupId, String content) {
}
