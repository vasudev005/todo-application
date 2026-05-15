const express = require('express');
const { listNotifications, markNotificationRead, seedAiReminder } = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', listNotifications);
router.post('/ai-reminder', seedAiReminder);
router.patch('/:id/read', markNotificationRead);

module.exports = router;
