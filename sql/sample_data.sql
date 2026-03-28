USE budget_travel_db;

-- Password for both users is: password123
INSERT INTO users (email, full_name, password, role) VALUES
('admin@budgettravel.com', 'Admin User', '$2a$10$zcP07j1ZP6QwON4ib9A2I.uIy/GxnUTJhslFeNXsqM.aZlMw4xQQK', 'ADMIN'),
('user@budgettravel.com', 'Demo Traveler', '$2a$10$zcP07j1ZP6QwON4ib9A2I.uIy/GxnUTJhslFeNXsqM.aZlMw4xQQK', 'USER');

INSERT INTO packages (title, location, description, duration_days, price, rating, image_url) VALUES
('Beach Escape Goa', 'Goa, India', 'Affordable beach package with hotel and breakfast included.', 4, 199.99, 4.3, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'),
('Bangkok City Budget Tour', 'Bangkok, Thailand', 'City tour with local guide, transport and 3-star accommodation.', 5, 299.99, 4.5, 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80'),
('Dubai Saver Package', 'Dubai, UAE', 'Budget-friendly Dubai package with desert safari.', 3, 349.99, 4.2, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80');

INSERT INTO bookings (user_id, package_id, travelers, travel_date) VALUES
(2, 1, 2, '2026-06-10'),
(2, 2, 1, '2026-07-15');
