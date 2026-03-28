package com.budgettravel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "package_id")
    private TravelPackage travelPackage;

    @Column(nullable = false)
    private Integer travelers;

    @Column(nullable = false)
    private LocalDate travelDate;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
