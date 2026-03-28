package com.budgettravel.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PackageRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String location;

    @NotBlank
    private String description;

    @NotNull
    @Min(1)
    private Integer durationDays;

    @NotNull
    @DecimalMin(value = "1.0")
    private BigDecimal price;

    @NotNull
    @Min(1)
    @Max(5)
    private Double rating;

    @NotBlank
    private String imageUrl;
}
