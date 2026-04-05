const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

router.get('/', hotelController.listHotels);
router.get('/:id', hotelController.getHotelDetails);

module.exports = router;
