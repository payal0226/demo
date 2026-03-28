package com.budgettravel.service;

import com.budgettravel.dto.AuthRequest;
import com.budgettravel.dto.AuthResponse;
import com.budgettravel.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}
