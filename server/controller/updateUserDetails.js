const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const userModel = require("../models/UserModel");

async function updateUserDetails(request,response){
    try{

        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token);

        const{name, profile_pic}= request.body;
        const updateUser = await userModel.updateOne({_id : user._id},{
            name,
            profile_pic
        })

        const userInformation = await userModel.findById(user._id)

        return response.json({
            message: "User updates successfully",
            data: userInformation,
            success: true,
        })

    }
    catch(error){
        return response.status(500).json({
            message: error.message || message,
            error: true,

        })
    }
}

module.exports = updateUserDetails;