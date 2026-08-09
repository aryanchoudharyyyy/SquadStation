package com.SquadStation.chat_service.repository;

import com.SquadStation.chat_service.enitiy.ListingMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface ListingMessageRepository extends JpaRepository<ListingMessage, Long> {
    @Query("""
    SELECT m
    FROM ListingMessage m
    WHERE m.conversationId = :conversationId
      AND (
            :cursorTime IS NULL
            OR m.sentAt < :cursorTime
            OR (m.sentAt = :cursorTime AND m.id < :cursorId)
      )
    ORDER BY m.sentAt DESC, m.id DESC
    """)
    List<ListingMessage> findHistoryBefore(
            @Param("conversationId") Long conversationId,
            @Param("cursorTime") LocalDateTime cursorTime,
            @Param("cursorId") Long cursorId,
            Pageable pageable
    );
    List<ListingMessage> findByConversationIdOrderBySentAtAsc(Long conversationId);
}