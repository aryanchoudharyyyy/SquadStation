package com.SquadStation.trip_service.repository;

import com.SquadStation.trip_service.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip,Long> {
    @Query("""
           SELECT t
           FROM Trip t
           WHERE t.id <> :tripId
           AND t.userId <> :userId
           AND t.sourcePoint =:sourcePoint
           AND t.boardingStation=:boardingStation
           AND t.travelDateTime BETWEEN :windowStart AND :windowEnd
          

""")
    List<Trip> findCandidates(
            @Param("tripId") Long tripId,
            @Param("userId") Long userId,
            @Param("sourcePoint") String sourcePoint,
            @Param("boardingStation") String boardingStation,
            @Param("windowStart") LocalDateTime windowStart,
            @Param("windowEnd") LocalDateTime windowEnd
          );
    @Query("SELECT CASE WHEN COUNT(t)>0 THEN true ELSE false END FROM Trip t " +
            "WHERE t.userId = :userId AND t.sourcePoint = :sourcePoint AND t.boardingStation = :boardingStation " +
            "AND t.travelDateTime BETWEEN :dayStart AND :dayEnd"
    )
    boolean existsMatchingTrip(
            @Param("userId") Long userId,
            @Param("sourcePoint") String sourcePoint,
            @Param("boardingStation") String boardingStation,
            @Param("dayStart") LocalDateTime dayStart,
            @Param("dayEnd") LocalDateTime dayEnd
    );
}
