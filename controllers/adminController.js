const Hotel = require('../models/Hotel');

exports.adminDashboard = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.render('admin/index', {
      title: 'Admin Panel',
      hotels
    });
  } catch (error) {
    next(error);
  }
};

exports.newHotelForm = (req, res) => {
  res.render('admin/new', { title: 'Add Hotel' });
};

exports.createHotel = async (req, res, next) => {
  try {
    const { name, location, price, rating, description } = req.body;

    if (!name || !location || !price || !rating || !description) {
      req.flash('error_msg', 'Please fill all required fields.');
      return res.redirect('/admin/hotels/new');
    }

    const images = req.files?.length
      ? req.files.map((file) => `/public/uploads/${file.filename}`)
      : ['https://images.unsplash.com/photo-1566073771259-6a8506099945'];

    await Hotel.create({ name, location, price, rating, description, images });

    req.flash('success_msg', 'Hotel created successfully.');
    return res.redirect('/admin');
  } catch (error) {
    next(error);
  }
};

exports.editHotelForm = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      req.flash('error_msg', 'Hotel not found.');
      return res.redirect('/admin');
    }

    return res.render('admin/edit', { title: 'Edit Hotel', hotel });
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const { name, location, price, rating, description } = req.body;
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      req.flash('error_msg', 'Hotel not found.');
      return res.redirect('/admin');
    }

    const newImages = req.files?.length
      ? req.files.map((file) => `/public/uploads/${file.filename}`)
      : hotel.images;

    hotel.name = name;
    hotel.location = location;
    hotel.price = price;
    hotel.rating = rating;
    hotel.description = description;
    hotel.images = newImages;

    await hotel.save();
    req.flash('success_msg', 'Hotel updated successfully.');
    return res.redirect('/admin');
  } catch (error) {
    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Hotel deleted successfully.');
    return res.redirect('/admin');
  } catch (error) {
    next(error);
  }
};
