const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth_MID.js');
const { getAllTasks, getTask, addTask, deleteT, updateTask, markTaskAsDone } = require('../controller/tasks_C.js');
const { ValidValues, ValidId, ValuesToEdit } = require('../middleware/tasks_MID.js');


router.get('/', isLoggedIn, getAllTasks);
router.get('/:id', isLoggedIn, ValidId, getTask);
router.post('/', isLoggedIn, ValidValues, addTask);
router.delete('/:id', isLoggedIn, deleteT);
router.patch('/:id', isLoggedIn, ValuesToEdit, updateTask);
router.patch('/done/:id', isLoggedIn, ValidId, markTaskAsDone);




module.exports = router;