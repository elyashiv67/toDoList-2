const express = require('express');
const path = require('path');
const cookies = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const api = process.env.HOST;
const db = require('./config/db_config');
app.use(express.json());
app.use(cookies());
const frontURL = [
    "http://localhost:5173",
    "http://10.0.0.10:5173",
    "http://localhost:5174",
    "http://localhost:4364",
    "https://to-do-list-react-zhv4.onrender.com",

    //this is the portfolio site url 
    "https://www.elyashiv-swisa.tech"
];
const cors = require('cors');
app.use(cors({
    origin: frontURL, // Specify exact origin, not wildcard *
    credentials: true // Allow credentials
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.use('/', require('./routers/pages_R'));
app.use('/users', require('./routers/users_R'));
app.use('/auth', require('./routers/auth_R'));
app.use('/categories', require('./routers/categories_R'));
app.use('/tasks', require('./routers/tasks_R'));

//added this so when i enter my portfolio the server will wake up 
// (its put to sleep after 30 min of inactivity (render free tier))
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Server is awake!' });
});



app.listen(port, () => { console.log(`http://${api}:${port}`); })