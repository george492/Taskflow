const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  rateTask
} = require('../controllers/taskController');

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status (e.g., Done, pending)
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   priority:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   totalTasks:
 *                     type: number
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   assignee:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               assignee:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, Done]
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               totalTasks:
 *                 type: number
 *               Checklist:
 *                 type: array
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Title is required
 *       500:
 *         description: Server error
 */
router.post('/', createTask);

/**
 * @swagger
 * /api/tasks/{id}/rate:
 *   post:
 *     summary: Rate a completed task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating submitted successfully
 *       400:
 *         description: Task must be marked as Done before rating or task already rated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.post('/:id/rate', rateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               assignee:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, Done]
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               totalTasks:
 *                 type: number
 *               Checklist:
 *                 type: array
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       403:
 *         description: Not authorized to update this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/:id',  updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       403:
 *         description: Not authorized to delete this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/:id',  deleteTask);

module.exports = router;
