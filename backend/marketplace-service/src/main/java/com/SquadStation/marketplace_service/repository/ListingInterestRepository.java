package com.SquadStation.marketplace_service.repository;

import com.SquadStation.marketplace_service.entity.ListingInterest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingInterestRepository extends JpaRepository<ListingInterest,Long> {
    @Query("SELECT i.listing.id AS listingId, CAST(COUNT(i.id) AS int) AS count "+
    "FROM ListingInterest i " +
            "WHERE i.listing.id IN :listingIds " +
    "GROUP BY i.listing.id")
    List<InterestCountProjection> countInterestsByListingIds(@Param("listingIds") List<Long> listingIds);
    Page<ListingInterest> findByListing_Id(Long listingId, Pageable pageable);///This method returns all ListingInterest records whose listing.id matches the given ID.
    boolean existsByListing_IdAndUserId(Long listingId, Long userId); /// This method checks whether a particular user has already shown interest in a particular listing.
}
