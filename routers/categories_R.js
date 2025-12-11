const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/auth_MID.js');
const {getAllCategories , addCategory, getCategory , deleteCategory} = require('../controller/categories_C.js');
const {valuesToAdd , ValidId} = require('../middleware/categories_MID.js');

router.get('/',isLoggedIn,getAllCategories);
router.get('/:id',isLoggedIn,ValidId,getCategory);
router.post('/add',isLoggedIn ,valuesToAdd ,addCategory);
router.delete('/delete/:id',isLoggedIn,ValidId,deleteCategory);

module.exports = router;
