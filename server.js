const express = require('express');
const app = express();
const PORT = 8080;
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Welcome to Blood Bank App',
    });
});
app.listen(PORT,()=>{
    console.log('Express server')
})