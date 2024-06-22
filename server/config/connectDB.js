require('dotenv').config(); // To use environment variables from a .env file





// const mongoose = require('mongoose')
// require('dotenv').config();

// async function connectDB(){
//     try{
//         await mongoose.connect(process.env.MONGODB_URI,{
//             useNewUrlParser: true,
//             useUnifiedTopology:true,
//             connectTimeoutMS: 30000,
//         })

//         const connection= mongoose.connection

//         connection.once('open',()=>{
//             console.log("Connect to DB");
//         })

//         connection.on('error',(error)=>{
//             console.log("Something is wrong with Mongodb",error);
//         })

        

//     }catch(error){
//         console.log('Something is wrong',error); 
//     }
     
// };

// module.exports = connectDB;





//second correct code starts here
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://simranantiphishing:satya123@chat-app.bx1wclj.mongodb.net/?retryWrites=true&w=majority&appName=chat-app', {
            // Use the new URL parser
            // useUnifiedTopology: true, // Use the new topology engine
            // connectTimeoutMS: 30000,
        });
      


        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log("Connected to DB");
        });

        connection.on('error', (error) => {
            console.error("Something is wrong with MongoDB", error);
        });
        
    } catch (error) {
        console.error('Something is wrong', error); 
    }
}

module.exports = connectDB;






// const mongoose = require('mongoose');

// // Print the loaded environment variable to verify
// console.log('MongoDB URI:', process.env.MONGODB_URI);

// async function connectDB() {
//     try {
//         const uri = process.env.MONGODB_URI;
//         if (!uri) {
//             throw new Error("MongoDB URI is not defined. Check your .env file.");
//         }

//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             connectTimeoutMS: 30000,
//         });

//         const connection = mongoose.connection;

//         connection.once('open', () => {
//             console.log("Connected to DB");
//         });

//         connection.on('error', (error) => {
//             console.error("Something is wrong with MongoDB", error);
//         });

//     } catch (error) {
//         console.error('Something is wrong', error);
//     }
// }

// connectDB();

// module.exports = connectDB;
