const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/auth_MID.js');
const {getAllCategories , addCategory} = require('../controller/categories_C.js');
const {valuesToAdd} = require('../middleware/categories_MID.js');

router.get('/',isLoggedIn,getAllCategories);
router.post('/add',isLoggedIn ,valuesToAdd ,addCategory);

module.exports = router;
