package com.SquadStation.chat_service.dto.Response;

import java.util.List;

public record MessageHistoryPage<T>(
        List<T> messages,
        String nextCursor,
        boolean hasMore
) {
}
