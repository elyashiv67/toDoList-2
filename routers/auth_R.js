const express = require('express');
const router = express.Router();
const {valuesToAdd,encryptPass,valuesToLogin} = require('../middleware/auth_MID.js');
const {addUser,login} = require('../controller/auth_c.js');

router.post('/reg',valuesToAdd,encryptPass,addUser);
router.post('/login',valuesToLogin,login);




module.exports = router;