const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            connectTimeoutMS: 30000,
        })

        const connection= mongoose.connection

        connection.on('connected',()=>{
            console.log("Connect to DB");
        })

        connection.on('error',(error)=>{
            console.log("Something is wrong with Mongodb",error);
        })

        

    }catch(error){
        console.log('Something is wrong',error); 
    }
     
};

module.exports = connectDB;