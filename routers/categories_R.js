const express = require('express');
const router = express.Router();
const {isLoggedIn , isAdmin} = require('../middleware/auth_MID.js');
const {getAllCategories , addCategory, getCategory , deleteCategory , editCategory , getAllCategoriesManager} = require('../controller/categories_C.js');
const {valuesToAdd , ValidId , valuesToEdit} = require('../middleware/categories_MID.js');

router.get('/',isLoggedIn,isAdmin,getAllCategories);
router.get('/manager',isLoggedIn,isAdmin,getAllCategoriesManager);
router.get('/:id',isLoggedIn,isAdmin,ValidId,getCategory);
router.post('/',isLoggedIn,isAdmin,valuesToAdd ,addCategory);
router.delete('/:id',isLoggedIn,isAdmin,ValidId,deleteCategory);
router.patch('/:id',isLoggedIn,isAdmin,ValidId,valuesToEdit,editCategory);

module.exports = router;
