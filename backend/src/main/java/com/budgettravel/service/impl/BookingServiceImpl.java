package com.budgettravel.service.impl;

import com.budgettravel.dto.BookingRequest;
import com.budgettravel.dto.BookingResponse;
import com.budgettravel.exception.ResourceNotFoundException;
import com.budgettravel.model.Booking;
import com.budgettravel.model.TravelPackage;
import com.budgettravel.model.User;
import com.budgettravel.repository.BookingRepository;
import com.budgettravel.repository.PackageRepository;
import com.budgettravel.repository.UserRepository;
import com.budgettravel.service.BookingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PackageRepository packageRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              UserRepository userRepository,
                              PackageRepository packageRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.packageRepository = packageRepository;
    }

    @Override
    public BookingResponse createBooking(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        TravelPackage travelPackage = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTravelPackage(travelPackage);
        booking.setTravelers(request.getTravelers());
        booking.setTravelDate(request.getTravelDate());

        return toResponse(bookingRepository.save(booking));
    }

    @Override
    public List<BookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private BookingResponse toResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .packageId(booking.getTravelPackage().getId())
                .packageTitle(booking.getTravelPackage().getTitle())
                .location(booking.getTravelPackage().getLocation())
                .travelers(booking.getTravelers())
                .travelDate(booking.getTravelDate())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
