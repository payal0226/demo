# Budget Travel Booking Website

A beginner-friendly full-stack web project for booking budget travel packages.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (responsive, no framework)
- **Backend:** Java 17 + Spring Boot
- **Database:** MySQL
- **Security:** JWT authentication + BCrypt password hashing

---

## Project Structure

```text
.
├── backend
│   ├── pom.xml
│   └── src/main
│       ├── java/com/budgettravel
│       │   ├── config
│       │   ├── controller
│       │   ├── dto
│       │   ├── exception
│       │   ├── model
│       │   ├── repository
│       │   ├── security
│       │   ├── service
│       │   └── BudgetTravelApplication.java
│       └── resources
│           └── application.properties
├── frontend
│   ├── index.html
│   ├── login.html
│   ├── packages.html
│   ├── package-details.html
│   ├── booking.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── css/styles.css
│   └── js/*.js
└── sql
    ├── schema.sql
    └── sample_data.sql
```

---

## Database Setup (MySQL)

1. Start MySQL server.
2. Run schema script:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
3. Run sample data script:
   ```bash
   mysql -u root -p < sql/sample_data.sql
   ```

### Demo Accounts
- Admin: `admin@budgettravel.com` / `password123`
- User: `user@budgettravel.com` / `password123`

---

## Backend Setup (Spring Boot)

1. Open `backend/src/main/resources/application.properties`.
2. Update DB credentials (`spring.datasource.username` / `spring.datasource.password`).
3. Run backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

Backend runs on: `http://localhost:8080`

---

## Frontend Setup

Because frontend is static HTML/CSS/JS, you can run it with any static server.

Example using Python:
```bash
cd frontend
python3 -m http.server 5500
```

Open: `http://localhost:5500`

Frontend API base URL is in `frontend/js/api.js`:
```js
const API_BASE = 'http://localhost:8080/api';
```

---

## Features Implemented

- User register/login with JWT
- Search and filter packages (keyword, location, max price, min rating)
- Package list and package detail pages
- Book travel package
- User booking history dashboard
- Admin package CRUD panel
- Responsive UI for desktop/mobile
- Input validation (frontend + backend)
- Global exception handling

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Packages
- `GET /api/packages`
- `GET /api/packages/{id}`

### Bookings (JWT required)
- `POST /api/bookings`
- `GET /api/bookings/me`

### Admin (ADMIN JWT required)
- `POST /api/admin/packages`
- `PUT /api/admin/packages/{id}`
- `DELETE /api/admin/packages/{id}`

---

## Quick API Payload Examples

### Register
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Booking
```json
{
  "packageId": 1,
  "travelers": 2,
  "travelDate": "2026-08-20"
}
```

---

## Notes
- This project keeps architecture clean and simple (Controller → Service → Repository).
- DTOs are used for request/response payloads.
- Replace JWT secret and DB password before production use.
