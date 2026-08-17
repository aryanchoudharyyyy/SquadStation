package com.SquadStation.trip_service.event;

import com.SquadStation.trip_service.dto.Response.MatchedTripResponse;
import jakarta.transaction.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;


@Component
@RequiredArgsConstructor

public class TripMatchNotificationListener {

    private final UserServiceClient userServiceClient;
      private final JavaMailSender mailSender;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onTripMatched(TripMatchedEvent event){
        for (MatchedTripResponse matched:event.getMatchedExistingTrips()){
            try{
                String email = userServiceClient.getEmailByUserId(matched.trip().getUserId());
                if (email==null) continue;
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("SquadStation - a new travel partner just matched your trip!");
                message.setText("A new travel partner just matched your upcoming trip from "+
                        event.getNewTrip().getSourcePoint() + " to " +event.getNewTrip().getBoardingStation()
                + " on " +event.getNewTrip().getTravelDateTime().toLocalDate() + "!"
                );
                mailSender.send(message);

            }
            catch (Exception e){
                System.err.println("Failed to notify a matched user: " + e.getMessage());

            }
        }
    }


}
