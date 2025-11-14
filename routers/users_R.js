const express = require('express');
const router = express.Router();
const {getAllUsers, getUser} = require('../controller/users_C.js');
const {ValidId,} = require('../middleware/users_MID.js');


router.get('/',getAllUsers);
router.get('/:id',ValidId,getUser);






module.exports = router;