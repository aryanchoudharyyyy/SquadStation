package com.SquadStation.chat_service.repository;

import com.SquadStation.chat_service.enitiy.ListingMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingMessageRepository extends JpaRepository<ListingMessage, Long> {
    List<ListingMessage> findByConversationIdOrderBySentAtAsc(Long conversationId);
}