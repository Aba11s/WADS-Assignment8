const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               completed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: The created task
 */
router.post('/', async (req, res) => {
  const { text, completed } = req.body;
  try {
    const task = await Task.create({ text, completed });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated task
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const task = await Task.update({ text, completed }, { where: { id } });
    if (task[0] === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id, text, completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
