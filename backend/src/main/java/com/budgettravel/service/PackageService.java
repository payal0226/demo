package com.budgettravel.service;

import com.budgettravel.dto.PackageRequest;
import com.budgettravel.dto.PackageResponse;

import java.math.BigDecimal;
import java.util.List;

public interface PackageService {
    List<PackageResponse> search(String keyword, String location, BigDecimal maxPrice, Double minRating);
    PackageResponse getById(Long id);
    PackageResponse create(PackageRequest request);
    PackageResponse update(Long id, PackageRequest request);
    void delete(Long id);
}
