const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors  = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./config/db');
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
connectDb();
const PORT = 8080;
app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Welcome to Blood Bank App',
    });
});
app.listen(PORT,()=>{
    console.log(`Node Server running in  on Port : ${PORT}`.bgBlue.white)
})
//