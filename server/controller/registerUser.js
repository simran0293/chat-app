const userModel = require("../models/UserModel");
const bcryptjs=require('bcryptjs')

async function registerUser(request,response){
    try{
        const { name, email, password, profile_pic} = request.body;
        //check if the user with the given email already exists or not
        const checkEmail = await userModel.findOne({email}); //{name,email} if find and null if not find

        if(checkEmail)
        {
            return response.status(400).json({
                message: "Already user exists",
                error: true
            })
        }

        //convert password into the hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        //now we want to save all the details onto database
        const payload ={
            name,
            email,
            profile_pic,
            password: hashPassword
        }

        const user = new userModel(payload);
        const userSave = await user.save();

        return response.status(201).json({
            message: "User created successfully",
            data: userSave,
            status: true
        })




    }catch(error){
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = registerUser;