const express = require('express');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config({path:"./config/config.env"});
const connectDB = require('./config/db');

//Connect to database
connectDB;

const   app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

// Routes files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT,console.log("REST Server running in ", process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log('Error '+err.message);
    //Close server & exit process
    server.close(()=>process.exit(1));
});