const express = require('express');
const path = require('path');
const cookies = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT ;
const api = process.env.HOST;
const db = require('./config/db_config');
app.use(express.json());
app.use(cookies());
const frontURL = "http://localhost:5173";
    const cors = require('cors');
    app.use(cors({
        origin: frontURL, // Specify exact origin, not wildcard *
        credentials: true // Allow credentials
    }));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());



app.use('/',require('./routers/pages_R'));
app.use('/users',require('./routers/users_R'));
app.use('/auth',require('./routers/auth_R'));
app.use('/categories',require('./routers/categories_R'));
app.use('/tasks',require('./routers/tasks_R'));



app.listen(port,()=>{console.log(`http://${api}:${port}`);})