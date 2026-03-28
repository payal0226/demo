package com.budgettravel.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class BookingResponse {
    private Long id;
    private Long packageId;
    private String packageTitle;
    private String location;
    private Integer travelers;
    private LocalDate travelDate;
    private LocalDateTime createdAt;
}
