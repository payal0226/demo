package com.budgettravel.controller;

import com.budgettravel.dto.PackageResponse;
import com.budgettravel.service.PackageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @GetMapping
    public ResponseEntity<List<PackageResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Double minRating
    ) {
        return ResponseEntity.ok(packageService.search(keyword, location, maxPrice, minRating));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getById(id));
    }
}
