package com.budgettravel.repository;

import com.budgettravel.model.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PackageRepository extends JpaRepository<TravelPackage, Long>, JpaSpecificationExecutor<TravelPackage> {
}
