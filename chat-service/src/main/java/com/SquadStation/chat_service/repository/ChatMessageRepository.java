package com.SquadStation.chat_service.repository;

import com.SquadStation.chat_service.enitiy.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository  extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByGroupIdOrderBySendAtAsc(Long groupId);
}
