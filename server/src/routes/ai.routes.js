const express = require('express');
const { getSummary } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/summary', getSummary);

module.exports = router;
