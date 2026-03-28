package com.budgettravel.service.impl;

import com.budgettravel.dto.PackageRequest;
import com.budgettravel.dto.PackageResponse;
import com.budgettravel.exception.ResourceNotFoundException;
import com.budgettravel.model.TravelPackage;
import com.budgettravel.repository.PackageRepository;
import com.budgettravel.service.PackageService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    public PackageServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @Override
    public List<PackageResponse> search(String keyword, String location, BigDecimal maxPrice, Double minRating) {
        Specification<TravelPackage> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isBlank()) {
                String text = "%" + keyword.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), text),
                        cb.like(cb.lower(root.get("description")), text)
                ));
            }
            if (location != null && !location.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }
            if (minRating != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("rating"), minRating));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return packageRepository.findAll(spec).stream().map(this::toResponse).toList();
    }

    @Override
    public PackageResponse getById(Long id) {
        TravelPackage travelPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
        return toResponse(travelPackage);
    }

    @Override
    public PackageResponse create(PackageRequest request) {
        TravelPackage travelPackage = toEntity(new TravelPackage(), request);
        return toResponse(packageRepository.save(travelPackage));
    }

    @Override
    public PackageResponse update(Long id, PackageRequest request) {
        TravelPackage existing = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));

        return toResponse(packageRepository.save(toEntity(existing, request)));
    }

    @Override
    public void delete(Long id) {
        if (!packageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Package not found with id: " + id);
        }
        packageRepository.deleteById(id);
    }

    private TravelPackage toEntity(TravelPackage travelPackage, PackageRequest request) {
        travelPackage.setTitle(request.getTitle());
        travelPackage.setLocation(request.getLocation());
        travelPackage.setDescription(request.getDescription());
        travelPackage.setDurationDays(request.getDurationDays());
        travelPackage.setPrice(request.getPrice());
        travelPackage.setRating(request.getRating());
        travelPackage.setImageUrl(request.getImageUrl());
        return travelPackage;
    }

    private PackageResponse toResponse(TravelPackage p) {
        return PackageResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .location(p.getLocation())
                .description(p.getDescription())
                .durationDays(p.getDurationDays())
                .price(p.getPrice())
                .rating(p.getRating())
                .imageUrl(p.getImageUrl())
                .build();
    }
}
