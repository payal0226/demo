package com.budgettravel.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingRequest {
    @NotNull
    private Long packageId;

    @NotNull
    @Min(1)
    private Integer travelers;

    @NotNull
    @FutureOrPresent
    private LocalDate travelDate;
}
