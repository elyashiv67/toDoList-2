const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT ;
const api = process.env.HOST;
const db = require('./config/db_config');
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());



app.get('/',(req,res)=>{res.sendFile(__dirname + '/public/index.html')});
app.use('/users',require('./routers/users_R'));



app.listen(port,()=>{console.log(`http://${api}:${port}`);})