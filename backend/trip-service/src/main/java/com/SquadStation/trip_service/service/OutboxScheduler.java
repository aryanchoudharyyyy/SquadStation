package com.SquadStation.trip_service.service;

public interface OutboxScheduler {
    void processOutboxEvents();
}
