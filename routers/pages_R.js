const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Login/login.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Login/login.html'));
});
router.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register/register.html'));
});
router.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Home.html'));
});

module.exports = router;