const express = require('express');
const { body } = require('express-validator');
const { listCategories, createCategory } = require('../controllers/category.controller');
const { protect } = require('../middleware/auth');
const validateRequest = require('../middleware/validate');

const router = express.Router();

router.use(protect);
router.get('/', listCategories);
router.post('/', [body('name').notEmpty()], validateRequest, createCategory);

module.exports = router;
