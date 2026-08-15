package com.SquadStation.marketplace_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "listing_interests", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"listing_id","user_id"})
})
public class ListingInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private TicketListing listing;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    private LocalDateTime expressedAt;

    @PrePersist
    protected void onCreate(){
        expressedAt = LocalDateTime.now();
    }
}
