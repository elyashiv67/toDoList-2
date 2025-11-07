const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT ;
const api = process.env.HOST;



app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());



app.get('/',(req,res)=>{res.sendFile(__dirname + '/public/index.html')});




app.listen(port,()=>{console.log(`http://${api}:${port}`);})