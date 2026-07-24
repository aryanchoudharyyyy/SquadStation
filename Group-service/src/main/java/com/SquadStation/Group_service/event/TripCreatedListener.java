package com.SquadStation.Group_service.event;

import com.SquadStation.Group_service.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripCreatedListener
{
    private final GroupRepository groupRepository;
    @RabbitListener(queues = "trip-created-queue")
    public  void handleTripCreated(TripCreatedEvent event){
        groupRepository.findBySourcePointAndBoardingStationAndTravelDate(
                event.sourcePoint(), event.boardingStation(), event.travelDate()
        ).ifPresentOrElse(
                group -> System.out.println("Existing group found for new trip"+event.tripId()+" - would notify group " + group.getId()),
                ()-> System.out.println("No existing group yet for trip " +event.tripId())
        );
    }

}
