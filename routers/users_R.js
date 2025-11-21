const express = require('express');
const router = express.Router();
const {getAllUsers, getUser,deleteUser,updateUser} = require('../controller/users_C.js');
const {ValidId, valuesToEdit,} = require('../middleware/users_MID.js');


router.get('/',getAllUsers);
router.get('/:id',ValidId,getUser);
router.delete('/:id',ValidId,deleteUser);
router.patch('/:id',ValidId,valuesToEdit,updateUser)






module.exports = router;