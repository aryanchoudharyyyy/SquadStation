package com.SquadStation.trip_service.repository;

import com.SquadStation.trip_service.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip,Long> {
    @Query("""
           SELECT t 
           FROM Trip t
           WHERE t.id <> :tripId
           AND t.userId <> :userId
           AND t.sourcePoint =:sourcePoint
           AND t.boardingStation=:boardingStation
           AND t.travelDate BETWEEN :dateFrom AND :dateTo
           

""")
    List<Trip> findCandidates(
            @Param("tripId") Long tripId,
            @Param("userId") Long userId,
            @Param("sourcePoint") String sourcePoint,
            @Param("boardingStation") String boardingStation,
            @Param("dateFrom") LocalDate dateFrom,
            @Param("dateTo") LocalDate dateTo
          );
}
