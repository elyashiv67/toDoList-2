const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, deleteUser, updateUser } = require('../controller/users_C.js');
const { ValidId, valuesToEdit, } = require('../middleware/users_MID.js');
const { isLoggedIn, isAdmin } = require('../middleware/auth_MID.js');


router.get('/', isLoggedIn, isAdmin, getAllUsers);
router.get('/:id', ValidId, isAdmin, getUser);
router.delete('/:id', ValidId, isAdmin, deleteUser);
router.patch('/:id', ValidId, isAdmin, valuesToEdit, updateUser)






module.exports = router;