package com.SquadStation.Group_sevice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String sourcePoint;
    @Column(nullable = false)
    private String boardingStation;
    @Column(nullable = false)
    private String travelDate;
    @Column(nullable = false)
    private Long createdBy;

    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate(){
        createdAt=LocalDateTime.now();
    }
}
