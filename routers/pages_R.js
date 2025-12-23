const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register/register.html'));
});

module.exports = router;