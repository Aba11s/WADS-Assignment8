const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/tasks', async (req, res) => {
  const { text } = req.body; 
  try {
    const task = await Task.create({ text });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  const { text, completed } = req.body;
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.text = text ?? task.text;
      task.completed = completed ?? task.completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.destroy({ where: { id } });
    if (deleted) res.json({ message: 'Task deleted' });
    else res.status(404).json({ error: "Task not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
