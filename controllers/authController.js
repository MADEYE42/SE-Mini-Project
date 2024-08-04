const userModels = require("../models/userModels")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async(req,res)=>{
    try {
        const existingUser = await userModels.findOne({
            email:req.body.email
        })
        if(existingUser){
            res.status(200).send({
                success:true,
                message:'User Already Exists'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword
        const user = new userModels(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message:'Register user succesfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        })
    }
}
const loginController = async(req,res)=>{
    try {
        const user = await userModels.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:true,
                message:'User not found'
            })
        }
        const comparePassword =await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login API",
            error
        })
    }
}
module.exports = {registerController,loginController}