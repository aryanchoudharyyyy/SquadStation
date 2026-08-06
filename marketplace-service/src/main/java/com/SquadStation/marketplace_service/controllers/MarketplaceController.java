package com.SquadStation.marketplace_service.controllers;

import com.SquadStation.marketplace_service.dto.CreateListingRequest;
import com.SquadStation.marketplace_service.dto.ListingResponse;
import com.SquadStation.marketplace_service.entity.TicketListing;
import com.SquadStation.marketplace_service.service.MarketplaceService;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {
    private final MarketplaceService marketplaceService;
    private final ServletRequest httpServletRequest;

    @PostMapping("/listings")
    public TicketListing createListing(@Valid @RequestBody CreateListingRequest request, HttpServletRequest httpRequest){
        return marketplaceService.createListing((Long) httpRequest.getAttribute("userId"),request);
    }

    @GetMapping("/listings")
    public List<ListingResponse> browseListings(){
        return  marketplaceService.browseListings();
    }
    @GetMapping("/listings/search")
    public List<ListingResponse> searchListings(@RequestParam String source, @RequestParam String destination,@RequestParam LocalDate travelDate){
        return marketplaceService.searchListings(source, destination, travelDate);
    }
    @GetMapping("/listings/mine")
    public List<ListingResponse> getMyListings(HttpServletRequest httpRequest){
        return marketplaceService.getMyListings((Long) httpRequest.getAttribute("userId"));
    }
    @PatchMapping("/listings/{listingid}")
    public String deleteListing(@PathVariable Long listingid, HttpServletRequest httpServletRequest){
        marketplaceService.deleteListing(listingid, (Long) httpServletRequest.getAttribute("userId"));
        return "Listing deleted";
    }
    @PostMapping("/listings/{listingId}/interest")
    public String expressInterest(@PathVariable Long listingId,HttpServletRequest request){
        marketplaceService.expressInternet(listingId, (Long) request.getAttribute("userId"));
        return "Interest recorder";
    }
    @GetMapping("/listings/{listingId}/interested-users")
    public List<String> getInterestedUsers(@PathVariable Long listingId , HttpServletRequest httpServletRequest){
        return marketplaceService.getInterestedUsers(listingId, (Long) httpServletRequest.getAttribute("userId"));
    }
    @GetMapping("/listings/{listingId}/owner")
    public Long getListingOwner(@PathVariable Long listingId){
        return marketplaceService.getListingOwner(listingId);
    }

}
