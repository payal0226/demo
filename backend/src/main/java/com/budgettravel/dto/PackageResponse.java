package com.budgettravel.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PackageResponse {
    private Long id;
    private String title;
    private String location;
    private String description;
    private Integer durationDays;
    private BigDecimal price;
    private Double rating;
    private String imageUrl;
}
