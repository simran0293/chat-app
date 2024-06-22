// const jwt = require('jsonwebtoken');
// const userModel = require('../models/UserModel');

// const JWT_SECRET_KEY ='ASCCDVFVFBBGBGBGBSDTHBFFBFGRFGHFBBXBFBFBFB'


// const getUserDetailsFromToken=async(token)=>{

//     if(!token)
//     {
//         return {
//             message:"Session expired",
//             logout: true,
//         }
//     }

//     const decode = await jwt.verify(token,JWT_SECRET_KEY);

//     const user= await userModel.findById(decode.id).select('-password');
//     return user;

// }
// module.exports = getUserDetailsFromToken;


const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');

const JWT_SECRET_KEY = 'ASCCDVFVFBBGBGBGBSDTHBFFBFGRFGHFBBXBFBFBFB';

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session expired",
            logout: true,
        };
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY);
        const user = await userModel.findById(decode.id).select('-password');
        return user;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                message: "Token expired",
                logout: true,
            };
        } else {
            return {
                message: "Invalid token",
                logout: true,
            };
        }
    }
};

module.exports = getUserDetailsFromToken;
