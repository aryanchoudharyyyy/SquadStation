package com.SquadStation.marketplace_service.dto;

import com.SquadStation.marketplace_service.enumm.ListingType;
import com.SquadStation.marketplace_service.enumm.TicketStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CreateListingRequest(ListingType listingType, TicketStatus status, String ticketClass,
                                   String source, String destination, LocalDate travelDate, BigDecimal price,
                                   Integer quantity, String description) {
}
