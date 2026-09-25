package com.CollegeTravel.trip_service.service;

public interface OutboxScheduler {
    void processOutboxEvents();
}
