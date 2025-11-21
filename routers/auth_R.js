const express = require('express');
const router = express.Router();
const {valuesToAdd,encryptPass} = require('../middleware/auth_MID.js');
const {addUser} = require('../controller/auth_c.js');

router.post('/reg',valuesToAdd,encryptPass,addUser);




module.exports = router;