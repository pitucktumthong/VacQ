const express = require('express');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

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

// Sanitize
app.use(mongoSanitize());

// Set security header
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({windowsMs:10*60*1000,max: 100}); // 10 mins
app.use(limiter);

// Prevent htpp param pollutions
app.use(hpp());

// Enable CORS
app.use(cors());

// Routes files
const hospitals = require('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/appointments',appointments);
app.use('/api/v1/auth',auth);

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT,console.log("REST Server running in ", process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log('Error '+err.message);
    //Close server & exit process
    server.close(()=>process.exit(1));
});