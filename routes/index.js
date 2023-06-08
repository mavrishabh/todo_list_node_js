const express = require('express');
const router = express.Router();

// Requiring the tasks controller
const tasksController = require('../controllers/task_controller');

router.get('/', tasksController.home);
router.post('/create-list', tasksController.create);
router.post('/delete-list', tasksController.delete);

module.exports = router;