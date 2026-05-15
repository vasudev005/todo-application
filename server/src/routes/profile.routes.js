const express = require('express');
const { updateProfile } = require('../controllers/profile.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.put('/', updateProfile);

module.exports = router;
