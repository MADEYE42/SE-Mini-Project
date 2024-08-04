const mongoose = require('mongoose');
const colors = require('colors')
const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb+srv://gmadye13:BiEKxwfwoMP8gb3Y@cluster10.0gfbmwn.mongodb.net/')
        console.log(`Connected to Mongo DB ${mongoose.connection.host}`.bgGreen.blue)
    } catch (error) {
        console.log(`MongoDb atlas error : ${error}`)
    }
}
module.exports = connectDb