package com.SquadStation.marketplace_service.entity;

import com.SquadStation.marketplace_service.enumm.ListingType;
import com.SquadStation.marketplace_service.enumm.TicketStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "ticket_listings")
public class TicketListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long postedByUserId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingType listingType;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    private String ticketClass;

    @Column(nullable = false)
    private String source;
    @Column(nullable = false)
    private String destination;
    @Column(nullable = false)
    private LocalDate travelDate;
    @Column(nullable = false)
    private BigDecimal price;
    @Column(nullable = false)
    private Integer quantity;
    @Column(length = 500)
    private String description;
    @Column(nullable = false)
    private boolean active;

    private LocalDateTime postedAt;


    @PrePersist
    protected void onCreate(){
        postedAt = LocalDateTime.now();
        active=true;
    }


}
