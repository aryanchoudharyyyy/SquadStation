package com.SquadStation.marketplace_service.serviceImpl;

import com.SquadStation.marketplace_service.client.UserLookupClient;
import com.SquadStation.marketplace_service.client.UserSummaryDTO;
import com.SquadStation.marketplace_service.dto.CreateListingRequest;
import com.SquadStation.marketplace_service.dto.ListingResponse;
import com.SquadStation.marketplace_service.entity.ListingInterest;
import com.SquadStation.marketplace_service.entity.TicketListing;
import com.SquadStation.marketplace_service.exception.AlreadyExpressedInterestException;
import com.SquadStation.marketplace_service.exception.CannotExpressInterestInOwnListingException;
import com.SquadStation.marketplace_service.exception.ListingNotFoundException;
import com.SquadStation.marketplace_service.exception.NotListingOwnerException;
import com.SquadStation.marketplace_service.repository.ListingInterestRepository;
import com.SquadStation.marketplace_service.repository.TicketListingRepository;
import com.SquadStation.marketplace_service.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketplaceServiceImpl implements MarketplaceService {
    private  final TicketListingRepository listingRepository;
    private  final ListingInterestRepository interestRepository;
    private final UserLookupClient userLookupClient;

    @Override
    public TicketListing createListing(Long userId, CreateListingRequest request){
        TicketListing listing = new TicketListing();
        listing.setPostedByUserId(userId);
        listing.setListingType(request.listingType());
        listing.setStatus(request.status());
        listing.setTicketClass(request.ticketClass());
        listing.setSource(request.source());
        listing.setDestination(request.destination());
        listing.setTravelDate(request.travelDate());
        listing.setPrice(request.price());
        listing.setQuantity(request.quantity());
        listing.setDescription(request.description());
        return listingRepository.save(listing);

    }

    @Override
    public List<ListingResponse> browseListings() {
        return listingRepository.findByActiveTrueOrderByPostedAtDesc().stream().map(this::toResponse).toList();
    }

    @Override
    public List<ListingResponse> searchListings(String source, String destination, LocalDate travelDate) {

        return listingRepository.findByActiveTrueAndSourceAndDestinationAndTravelDate(source, destination, travelDate)
                .stream().map(this::toResponse).toList();
    }

    @Override
    public List<ListingResponse> getMyListings(Long userId) {
        return listingRepository.findByPostedByUserId(userId).stream().map(this::toResponse).toList();
    }

    @Override
    public void markAsSold(Long listingId, Long userId) {
        TicketListing listing = getOwnedListing(listingId, userId);
        listing.setActive(false);
        listingRepository.save(listing);
    }

    @Override
    public void deleteListing(Long listingId, Long userId) {
        listingRepository.delete(getOwnedListing(listingId, userId));
    }

    @Override
    public void expressInternet(Long listingId, Long userId) {
        TicketListing listing =listingRepository.findById(listingId)
                .orElseThrow(()-> new ListingNotFoundException("Listing not found: "+ listingId));
        if (listing.getPostedByUserId().equals(userId)){
            throw new CannotExpressInterestInOwnListingException("You cannot interest in your own listing");
        }
        if (interestRepository.existsByListing_IdAndUserId(listingId,userId)){
            throw  new AlreadyExpressedInterestException("You have already express interest in this listing");
        }
        ListingInterest interest = new ListingInterest();
        interest.setListing(listing);
        interest.setUserId(userId);
        interestRepository.save(interest);
    }

    @Override
    public List<String> getInterestedUsers(Long listingId, Long ownerUserId) {
        getOwnedListing(listingId, ownerUserId);
        List<Long> userIds = interestRepository.findByListing_Id(listingId).stream().map(ListingInterest::getUserId).toList();
        return  userLookupClient.getUserByIds(userIds).stream().map(UserSummaryDTO::name).toList();
    }

    @Override
    public Long getListingOwner(Long listingId) {
        return listingRepository.findById(listingId)
                .orElseThrow(()-> new ListingNotFoundException("Listing Not found: "+ listingId))
                .getPostedByUserId();
    }

    private TicketListing getOwnedListing(Long listingId, Long userId){
        TicketListing listing = listingRepository.findById(listingId)
                .orElseThrow(
                        ()-> new ListingNotFoundException("Listing not found: "+ listingId)
                );
        if (!listing.getPostedByUserId().equals(userId)){
            throw  new NotListingOwnerException("You can only manage your own listings");
        }
        return listing;
    }
    private ListingResponse toResponse(TicketListing l){
        int interestedCount = interestRepository.findByListing_Id(l.getId()).size();
        return  new ListingResponse(l.getId(), l.getPostedByUserId(),l.getListingType(), l.getStatus(),
                l.getTicketClass(),l.getSource(),l.getDestination(),l.getTravelDate(),l.getPrice(),
        l.getQuantity(),l.getDescription(),l.isActive(),l.getPostedAt(), interestedCount);
    }
}

