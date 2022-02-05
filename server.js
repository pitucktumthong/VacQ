const express = require('express');
const dotenv  = require('dotenv');

// Load environment variables
dotenv.config({path:"./config/config.env"});

const   app=express();

const hospitals = require('./routes/hospitals');
app.use('/api/v1/hospitals',hospitals);

const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log("REST Server running in ", process.env.NODE_ENV, 'mode on port', PORT));
