const express = require('express');
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/', ensureAdmin, adminController.adminDashboard);
router.get('/hotels/new', ensureAdmin, adminController.newHotelForm);
router.post('/hotels', ensureAdmin, upload.array('images', 5), adminController.createHotel);
router.get('/hotels/:id/edit', ensureAdmin, adminController.editHotelForm);
router.put('/hotels/:id', ensureAdmin, upload.array('images', 5), adminController.updateHotel);
router.delete('/hotels/:id', ensureAdmin, adminController.deleteHotel);

module.exports = router;
