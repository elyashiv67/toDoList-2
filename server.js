const express = require('express');
const path = require('path');
const app = express();
const port = 4365 ;
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());



app.get('/',(req,res)=>{res.sendFile(__dirname + '/public/index.html')});




app.listen(port,()=>{console.log(`http://localhost:${port}`);})