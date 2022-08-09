const process = require('process')
require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cors = require('cors');

//Puerto
PORT = process.env.PORT;

//Mongo
const dbConnection = require('./src/database/config');
dbConnection();

//Routes
const userRouter = require('./src/routes/userRouter')

//App middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cors());

app.use('/api',userRouter);

app.listen(PORT,()=>{
    console.log(`Server in port ${PORT}`)
})