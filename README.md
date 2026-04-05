# TripNest - Full-Stack Travel Booking Website

TripNest is a beginner-friendly yet scalable full-stack travel booking website inspired by platforms like MakeMyTrip.

It is built with:
- **Frontend:** HTML, CSS, Bootstrap, JavaScript, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose

---

## 1) Features Implemented

### User Side
- User Signup/Login/Logout with session-based auth
- Search hotels by:
  - Location
  - Price range
  - Minimum rating
- Hotel listings with image, price, rating, location
- Hotel detail page
- Booking form (check-in, check-out, guests)
- Booking history dashboard

### Admin Side
- Admin-only panel
- Add hotel
- Edit hotel
- Delete hotel
- Upload hotel images (Multer, local upload)

### Additional Features
- Flash messages for success/error states
- Pagination on hotel listing page
- Clean MVC folder architecture
- Basic server-side validation and global error handling

---

## 2) Database Models

### User Model
- `name`
- `email` (unique)
- `password` (bcrypt hashed)
- `role` (`user` / `admin`)

### Hotel Model
- `name`
- `location`
- `price`
- `rating`
- `images` (array)
- `description`

### Booking Model
- `userId` (ref User)
- `hotelId` (ref Hotel)
- `checkIn`
- `checkOut`
- `guests`
- `totalPrice`

---

## 3) Project Structure

```bash
travel-booking-app/
├── app.js
├── package.json
├── .env.example
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── bookingController.js
│   └── hotelController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── Booking.js
│   ├── Hotel.js
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   └── hotelRoutes.js
├── views/
│   ├── admin/
│   ├── auth/
│   ├── bookings/
│   ├── hotels/
│   └── partials/
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   └── uploads/
└── data/
    └── seed.js
```

---

## 4) Step-by-Step Setup Guide

## Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd demo
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Setup Environment Variables
Create `.env` file in root and copy from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/travel_booking_app
SESSION_SECRET=replace_with_secure_secret
```

## Step 4: Run MongoDB
Ensure MongoDB is running locally (or provide Atlas URI in `.env`).

## Step 5: Seed Sample Data
```bash
npm run seed
```

This creates:
- Admin user: `admin@tripnest.com / admin123`
- Normal user: `john@example.com / user123`
- Sample hotels + one sample booking

## Step 6: Run Development Server
```bash
npm run dev
```

Open browser:
- `http://localhost:5000`

---

## 5) Routes Explanation (RESTful)

## Auth Routes
- `GET /signup` -> Signup page
- `POST /signup` -> Register user
- `GET /login` -> Login page
- `POST /login` -> Login user
- `POST /logout` -> Logout user

## Hotel Routes
- `GET /hotels` -> List hotels (supports filters + pagination)
- `GET /hotels/:id` -> Hotel details page

## Booking Routes
- `POST /bookings/:hotelId` -> Create booking (auth required)
- `GET /bookings/dashboard` -> User booking history (auth required)

## Admin Routes (Admin only)
- `GET /admin` -> Admin dashboard
- `GET /admin/hotels/new` -> Add hotel form
- `POST /admin/hotels` -> Create hotel
- `GET /admin/hotels/:id/edit` -> Edit form
- `PUT /admin/hotels/:id` -> Update hotel
- `DELETE /admin/hotels/:id` -> Delete hotel

---

## 6) Validation + Security
- Password hashing using `bcryptjs`
- Session-based auth using `express-session`
- Role-based access control for admin routes
- Server-side checks for required fields and dates
- Centralized 404 and 500 error handlers

---

## 7) Beginner-Friendly Notes
- Code is organized using **MVC architecture** for easy understanding.
- Controllers contain business logic.
- Routes map URL endpoints to controllers.
- Models define MongoDB data schemas.
- EJS templates are split into reusable partials (navbar/footer/messages).

---

## 8) Future Improvements (Scalable Direction)
- Move local image upload to Cloudinary / S3
- Add payment gateway (Stripe/Razorpay)
- JWT auth for APIs
- Add hotel availability calendar
- Add review and rating system
- Add automated tests (Jest + Supertest)

