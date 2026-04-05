const Hotel = require('../models/Hotel');

exports.listHotels = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const filter = {};

    // Flexible filters for location, budget, and ratings.
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.rating) {
      filter.rating = { $gte: Number(req.query.rating) };
    }

    const total = await Hotel.countDocuments(filter);
    const hotels = await Hotel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.render('hotels/index', {
      title: 'Explore Hotels',
      hotels,
      currentPage: page,
      totalPages: Math.ceil(total / limit) || 1,
      query: req.query
    });
  } catch (error) {
    next(error);
  }
};

exports.getHotelDetails = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      req.flash('error_msg', 'Hotel not found.');
      return res.redirect('/hotels');
    }

    return res.render('hotels/show', { title: hotel.name, hotel });
  } catch (error) {
    next(error);
  }
};
