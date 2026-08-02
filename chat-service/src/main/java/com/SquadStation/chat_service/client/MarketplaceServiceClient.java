package com.SquadStation.chat_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "marketplace-service")
public interface MarketplaceServiceClient {
    @GetMapping("/api/marketplace/listings/{listingId}/owner")
    Long getListingOwner(@PathVariable("listingId") Long listingId);
}

