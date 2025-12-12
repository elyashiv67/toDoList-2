const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/auth_MID.js');
const {getAllTasks , getTask , addTask} = require('../controller/tasks_C.js');
const { ValidValues,ValidId} = require('../middleware/tasks_MID.js');


router.get('/',isLoggedIn,getAllTasks);
router.get('/:id',isLoggedIn,ValidId,getTask);
router.post('/add',isLoggedIn,ValidValues,addTask);



module.exports = router;