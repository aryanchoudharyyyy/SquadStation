package com.SquadStation.marketplace_service.service;

import com.SquadStation.marketplace_service.dto.CreateListingRequest;
import com.SquadStation.marketplace_service.dto.ListingResponse;
import com.SquadStation.marketplace_service.entity.TicketListing;

import java.time.LocalDate;
import java.util.List;

public interface MarketplaceService {
    TicketListing createListing(Long userId, CreateListingRequest request);
    List<ListingResponse> browseListings();
    List<ListingResponse> searchListings(String source, String destination, LocalDate travelDate);
    List<ListingResponse> getMyListings(Long userId);
    void markAsSold(Long listingId, Long userId);
    void deleteListing(Long listingId, Long userId);
    void expressInternet(Long listingId, Long userId);
    List<String> getInterestedUsers(Long listingId, Long ownerUserId);
    Long getListingOwner(Long listingId);
}
