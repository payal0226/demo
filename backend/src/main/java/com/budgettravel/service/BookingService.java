package com.budgettravel.service;

import com.budgettravel.dto.BookingRequest;
import com.budgettravel.dto.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(String userEmail, BookingRequest request);
    List<BookingResponse> getMyBookings(String userEmail);
}
