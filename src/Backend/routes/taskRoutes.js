const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  rateTask
} = require('../controllers/taskController');

const router = express.Router();

// All routes are protected — handled by middleware in server.js
router.get('/', getTasks);          // GET /api/tasks
router.post('/', createTask);       // POST /api/tasks
router.post('/:id/rate', rateTask); // POST /api/tasks/:id/rate
router.put('/:id', updateTask);     // PUT /api/tasks/:id
router.delete('/:id', deleteTask);  // DELETE /api/tasks/:id

module.exports = router;
