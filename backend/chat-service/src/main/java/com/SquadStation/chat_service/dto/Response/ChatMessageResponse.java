package com.SquadStation.chat_service.dto.Response;

import java.time.LocalDateTime;

public record ChatMessageResponse(Long id, Long groupId, Long senderId, String content, LocalDateTime sendAt) {
}
