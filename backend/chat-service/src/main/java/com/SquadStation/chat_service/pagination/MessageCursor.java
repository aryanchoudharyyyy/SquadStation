package com.SquadStation.chat_service.pagination;

import java.time.LocalDateTime;

public record MessageCursor(
        LocalDateTime timestamp, Long id
) {
}
//Cursor ke andar oldest loaded message ka timestamp aur ID store hoga.