package com.SquadStation.Group_sevice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "group_members", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"group_id","user_id"})
})

public class GroupMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id",nullable = false)
    private Group group;
    @Column(name = "user_id", nullable = false)
    private Long userId;

    private LocalDateTime joinedAt;
    @PrePersist
    protected void onCreate(){
        joinedAt = LocalDateTime.now();
    }
}
