const userModels = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required.'
            });
        }

        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModels({ ...req.body, password: hashedPassword });
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error('Error in registerController:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in register API',
            error
        });
    }
};
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required.'
            });
        }

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.password) {
            console.error('User password is undefined:', user);
            return res.status(500).send({
                success: false,
                message: 'User password is missing in the database'
            });
        }

        console.log('Comparing passwords:', password, user.password);
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, 'gmadye13', { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            user
        });
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        });
    }
};

const currentUserController = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log()
    }
}
module.exports = { registerController, loginController,currentUserController };
