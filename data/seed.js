require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_booking_app');

    await Promise.all([User.deleteMany({}), Hotel.deleteMany({}), Booking.deleteMany({})]);

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const [admin, user] = await User.create([
      { name: 'Admin User', email: 'admin@tripnest.com', password: adminPassword, role: 'admin' },
      { name: 'John Traveler', email: 'john@example.com', password: userPassword, role: 'user' }
    ]);

    const hotels = await Hotel.insertMany([
      {
        name: 'Sea Breeze Resort',
        location: 'Goa',
        price: 120,
        rating: 4.5,
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
        description: 'Beautiful beachside resort with swimming pool and sunset views.'
      },
      {
        name: 'Mountain Escape Lodge',
        location: 'Manali',
        price: 90,
        rating: 4.2,
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
        description: 'Cozy mountain hotel with bonfire nights and trekking support.'
      },
      {
        name: 'City Comfort Inn',
        location: 'Bangalore',
        price: 75,
        rating: 4.0,
        images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
        description: 'Centrally located business hotel with modern facilities.'
      }
    ]);

    await Booking.create({
      userId: user._id,
      hotelId: hotels[0]._id,
      checkIn: new Date('2026-06-01'),
      checkOut: new Date('2026-06-04'),
      guests: 2,
      totalPrice: 720
    });

    console.log('✅ Database seeded successfully');
    console.log('Admin login: admin@tripnest.com / admin123');
    console.log('User login: john@example.com / user123');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
