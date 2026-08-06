package com.SquadStation.marketplace_service.dto;

import com.SquadStation.marketplace_service.enumm.ListingType;
import com.SquadStation.marketplace_service.enumm.TicketStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CreateListingRequest(
                                   @NotNull ListingType listingType,
                                   @NotNull TicketStatus status,
                                   @NotBlank @Size(max = 100) String ticketClass,
                                   @NotBlank @Size(max = 150) String source,
                                   @NotBlank @Size(max = 150) String destination,
                                   @NotNull @FutureOrPresent LocalDate travelDate,
                                   @NotNull @DecimalMin(value = "0.0", inclusive = false) BigDecimal price,
                                   @NotNull @Positive Integer quantity,
                                   @Size(max = 500) String description) {
}
