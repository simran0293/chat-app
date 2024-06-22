require('dotenv').config()
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const {app,server} = require('./socket/index')

// const app=express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Allow credentials (cookies, authorization headers)
  }));

app.use(express.json());
app.use(cookiesParser());

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
    server.listen(PORT,()=>{
    console.log("Server running at"+ PORT)
})
}).catch(error => {
    console.error("Failed to connect to the database:", error);
    // Handle the error here
});

