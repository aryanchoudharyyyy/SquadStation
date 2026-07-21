package com.SquadStation.trip_service.entity;

import com.SquadStation.trip_service.enumm.TravelMode;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
@Entity
@Data
@NoArgsConstructor
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    private TravelMode mode;
    @Column(nullable = false)
    private String sourcePoint;
    @Column(nullable = false)
    private String boardingStation;  // Railway Station/Bus Stand — matching field
    private String destination;
    private String vehicleNumber;
    @Column(nullable = false)
    private LocalDateTime travelDateTime;
}
