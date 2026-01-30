const express = require('express');
const router = express.Router();
const {isLoggedIn } = require('../middleware/auth_MID.js');
const {getAllCategories , addCategory, getCategory , deleteCategory , editCategory , getCategoryTaskCount} = require('../controller/categories_C.js');
const {valuesToAdd , ValidId , valuesToEdit} = require('../middleware/categories_MID.js');

router.get('/',isLoggedIn,getAllCategories);
router.get('/:id',isLoggedIn,ValidId,getCategory);
router.get('/tasksCount/:id',isLoggedIn,ValidId,getCategoryTaskCount);
router.post('/',isLoggedIn,valuesToAdd ,addCategory);
router.delete('/:id',isLoggedIn,ValidId,deleteCategory);
router.patch('/:id',isLoggedIn,ValidId,valuesToEdit,editCategory);

module.exports = router;
