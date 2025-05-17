const Task = require('../models/Task');

// GET /api/tasks?status=Done
const getTasks = async (req, res) => {
  try {
    // const filter = {
    //  createdBy:req.user._id
    // };
    // 
     console.log("req.user",req.user._id);
    
    const filter = {
      $or: [
        { assignee:req.user._id },
        { createdBy:req.user._id }
      ]
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).populate('Checklist').populate('createdBy', 'name').populate('assignee', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    console.log('Received task data:', req.body);
    console.log('User from auth middleware:', req.user);

    const { title, description, deadline, assignee, status, priority, startDate, totalTasks, Checklist } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Process assignee field
    let processedAssignee = [];
    if (assignee && Array.isArray(assignee)) {
      // Filter out empty strings and ensure all values are valid ObjectIds
      processedAssignee = assignee
        .filter(id => id && id.trim() !== '')
        .map(id => id.trim());
    }

    // Create task with authenticated user as creator
    const task = new Task({
      title,
      description,
      startDate,
      deadline,
      assignee: processedAssignee.length > 0 ? processedAssignee : undefined, // Only set if there are valid assignees
      status: status || 'pending',
      priority: priority || 'Medium',
      totalTasks: totalTasks || 0,
      Checklist: Array.isArray(Checklist) ? Checklist : [], // Ensure Checklist is an array
      createdBy: req.user._id
    });

    console.log('Task to be saved:', task);

    await task.save();
    console.log('Task saved successfully');

    // Populate creator details before sending response
    await task.populate('createdBy', 'name email');
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ 
      message: 'Error creating task',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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
