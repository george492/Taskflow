const Task = require('../models/Task');

// GET /api/tasks?status=Done
const getTasks = async (req, res) => {
  try {
    const filter = { assignee: req.user._id };
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).populate('createdBy', 'name').populate('assignee', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignee, status } = req.body;

    const task = new Task({
      title,
      description,
      deadline,
      assignee,
      status,
      createdBy: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

const rateTask = async (req, res) => {
  try {
    const { rating } = req.body;
    const task = await Task.findById(req.params.id).populate('assignee');

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== 'Done') {
      return res.status(400).json({ message: 'Task must be marked as Done before rating' });
    }
    if (!task.assignee) {
      return res.status(400).json({ message: 'No assignee to rate' });
    }
    if (task.ratingGiven) {
      return res.status(400).json({ message: 'This task has already been rated' });
    }

    // Update the task's ratingGiven
    task.ratingGiven = rating;
    await task.save();

    // Update the assignee's average rating
    const user = task.assignee;
    user.rating = ((user.rating * user.numOfRatings) + rating) / (user.numOfRatings + 1);
    user.numOfRatings += 1;
    await user.save();

    res.json({ message: 'Rating submitted', newRating: user.rating });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting rating' });
  }
};


// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only creator or assignee can update
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      task.assignee?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only creator can delete
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  rateTask,
};
