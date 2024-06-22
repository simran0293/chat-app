const userModel = require("../models/UserModel")
const bcryptjs=require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY ='ASCCDVFVFBBGBGBGBSDTHBFFBFGRFGHFBBXBFBFBFB'

async function checkPassword(request,response){
    try{
        const {password,userId}= request.body
        const user=await userModel.findById(userId)

        const verifyPassword= await bcryptjs.compare(password,user.password)

        //if password does not matches
        if(!verifyPassword)
        {
            return response.status(400).json({
                message:"Please chack password",
                error: true
            })
        }

        const tokenData={
            id: user._id,
            email: user.email
        }
        const token= await jwt.sign(tokenData,JWT_SECRET_KEY,{expiresIn: '1d'});

        const cookieOptions={
            http:true,
            secure:true
        }

        return response.cookie('token', token ,cookieOptions).status(200).json({
            message:"Login Successful",
            token:token,
            success: true
        })

    }
    catch(error){
        return response.status(500).json({
            message: error.message || error,
            error: true,
        })
    }
}

module.exports = checkPassword;