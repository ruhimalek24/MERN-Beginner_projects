const express = require('express');
const router = express.Router();
const { getAllTasks, addTask, markTaskCompleted, deleteTask } = require('../controllers/taskController');

router.get('/tasks', getAllTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', markTaskCompleted);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
