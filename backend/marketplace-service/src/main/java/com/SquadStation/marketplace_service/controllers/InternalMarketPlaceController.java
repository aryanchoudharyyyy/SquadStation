package com.SquadStation.marketplace_service.controllers;

import com.SquadStation.marketplace_service.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/internal/marketplace")
@RequiredArgsConstructor
public class InternalMarketPlaceController {
    private final MarketplaceService marketplaceService;
    @GetMapping("/listings/{listingId}/owner")
    public Long getListingOwner(@PathVariable Long listingId){
        return marketplaceService.getListingOwner(listingId);
    }

}
