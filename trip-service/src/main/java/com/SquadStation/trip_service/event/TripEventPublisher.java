package com.SquadStation.trip_service.event;

import com.SquadStation.trip_service.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripEventPublisher {
    private final RabbitTemplate rabbitTemplate;
    public void publishTripCreated(TripCreatedEvent event){
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY,event);
    }
}
