const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

exports.createBooking = async (req, res, next) => {
  try {
    const { checkIn, checkOut, guests } = req.body;
    const hotel = await Hotel.findById(req.params.hotelId);

    if (!hotel) {
      req.flash('error_msg', 'Hotel not found.');
      return res.redirect('/hotels');
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      req.flash('error_msg', 'Check-out date must be after check-in date.');
      return res.redirect(`/hotels/${hotel._id}`);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * hotel.price * Number(guests);

    await Booking.create({
      userId: req.session.user._id,
      hotelId: hotel._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests),
      totalPrice
    });

    req.flash('success_msg', 'Booking confirmed successfully.');
    return res.redirect('/bookings/dashboard');
  } catch (error) {
    next(error);
  }
};

exports.userBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.session.user._id })
      .populate('hotelId')
      .sort({ createdAt: -1 });

    res.render('bookings/dashboard', {
      title: 'My Bookings',
      bookings
    });
  } catch (error) {
    next(error);
  }
};
