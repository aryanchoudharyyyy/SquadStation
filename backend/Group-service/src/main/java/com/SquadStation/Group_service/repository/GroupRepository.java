package com.SquadStation.Group_service.repository;

import com.SquadStation.Group_service.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group,Long> {
    Optional<Group> findBySourcePointAndBoardingStationAndTravelDate(
            String sourcePoint, String boardingStation, LocalDate travelDate
    );
}
