package com.SquadStation.marketplace_service.repository;

import com.SquadStation.marketplace_service.entity.ListingInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingInterestRepository extends JpaRepository<ListingInterest,Long> {
    List<ListingInterest> findByListing_Id(Long listingId);///This method returns all ListingInterest records whose listing.id matches the given ID.
    boolean existsByListing_IdAndUserId(Long listingId, Long userId); /// This method checks whether a particular user has already shown interest in a particular listing.
}
