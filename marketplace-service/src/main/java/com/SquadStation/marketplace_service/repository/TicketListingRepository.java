package com.SquadStation.marketplace_service.repository;

import com.SquadStation.marketplace_service.entity.TicketListing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TicketListingRepository extends JpaRepository<TicketListing, Long> {
    Page<TicketListing> findByActiveTrueOrderByPostedAtDesc(Pageable pageable); //Finds all ticket listings where active = true.
   // Sorts the results according to postedAt.
    //Uses descending order (DESC), so the newest tickets appear first.
    Page<TicketListing> findByActiveTrueAndSourceAndDestinationAndTravelDate(String source, String destination, LocalDate travelDate,Pageable pageable);   ///This method searches for tickets that satisfy all of the following conditions:
    ///active = true
    ///source = ?
    ///destination = ?
    ///travelDate = ?
    Page<TicketListing> findByPostedByUserId(Long userId,Pageable pageable);
}
