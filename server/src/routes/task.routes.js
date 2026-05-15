const express = require('express');
const { body } = require('express-validator');
const {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getTrash,
  restoreTask,
  deletePermanently,
  reorderTasks
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth');
const validateRequest = require('../middleware/validate');

const router = express.Router();

router.use(protect);
router.get('/', listTasks);
router.get('/trash', getTrash);
router.post(
  '/',
  [body('title').notEmpty().withMessage('Task title is required')],
  validateRequest,
  createTask
);
router.patch('/reorder', reorderTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/restore', restoreTask);
router.delete('/:id/permanent', deletePermanently);

module.exports = router;
