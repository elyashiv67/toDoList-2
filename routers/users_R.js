const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controller/users_C.js');


router.get('/',getAllUsers);






module.exports = router;