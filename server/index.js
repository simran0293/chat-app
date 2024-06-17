const express=require('express');
const cors=require('cors');
require('dotenv').config()
const connectDB=require('./config/connectDB')
const router = require('./routes/index')

const app=express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credential:true
}))

app.use(express.json());

const PORT=process.env.PORT || 8080;

//routes
app.get('/',(request,response)=>{
    response.json({
        message: "server runnning at "+PORT
    })

})


//api endpoints
app.use('/api',router);

//app.listen is use to start the server and listen for the incoming http requests
connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server running at"+ PORT)
})
}).catch(error => {
    console.error("Failed to connect to the database:", error);
    // Handle the error here
});

