const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, deleteUser, updateUser , getUsersForCategories} = require('../controller/users_C.js');
const { ValidId, valuesToEdit, } = require('../middleware/users_MID.js');
const { isLoggedIn, isAdmin } = require('../middleware/auth_MID.js');


router.get('/', isLoggedIn, isAdmin, getAllUsers);
router.get('/categoriesUsers', isLoggedIn, isAdmin, getUsersForCategories);
router.get('/:id', isLoggedIn, isAdmin, ValidId, getUser);
router.delete('/:id', isLoggedIn, isAdmin, ValidId, deleteUser);
router.patch('/:id', isLoggedIn, isAdmin, ValidId, valuesToEdit, updateUser)




module.exports = router;