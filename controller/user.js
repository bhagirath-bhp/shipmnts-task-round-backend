const User = require('../models/user')
const cookieToken = require('../utils/cookieToken')
const bcrypt = require('bcryptjs')

exports.signup = async(req,res) => {
    try {
        const {full_name,email,password, phone_number} = req.body

        const existingUser = await User.findOne({email: email, phone_number: phone_number})
        if(existingUser){
            return res.status(400).json("User already exists!")
        }
        else{
            const user = new User({
                full_name,
                email,
                phone_number,
                password
            })
            await user.save();
            cookieToken(user,res)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.login = async(req,res) => {
    try {
        const {email,password,phone_number} = req.body 
        const user = await User.findOne({
            where: {
                [email ? "email" : "phone_number"]:email||phone_number
            }
        })

        if(!user){
            return res.status(400).json("no user found")
        }

        const isValidated = await bcrypt.compare(password,user.password)

        if(!isValidated){
            return res.status(400).json("wrong credentials")
        }

        cookieToken(user,res)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}