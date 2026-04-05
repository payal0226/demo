const express = require('express');
const bookingController = require('../controllers/bookingController');
const { ensureAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:hotelId', ensureAuth, bookingController.createBooking);
router.get('/dashboard', ensureAuth, bookingController.userBookings);

module.exports = router;
