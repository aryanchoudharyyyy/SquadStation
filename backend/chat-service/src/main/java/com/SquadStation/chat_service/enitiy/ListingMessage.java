package com.SquadStation.chat_service.enitiy;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor@Table(
        name = "listing_messages",
        indexes = {
                @Index(
                        name = "idx_listing_messages_conversation_time_id",
                        columnList = "conversation_id, sent_at, id"
                )
        }
)
public class ListingMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false)
    private Long conversationId;
    @Column(nullable = false)
    private Long senderId;
    @Column(nullable = false, length = 1000)
    private String content;
    private LocalDateTime sentAt;
    @PrePersist protected void onCreate() { sentAt = LocalDateTime.now(); }
}