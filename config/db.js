const mongoose = require('mongoose');

const connectDB = mongoose.connect(process.env.MONGO_URI,{useNewUrlParser : true,useUnifiedTopology : true },err =>{if(err) throw err;console.log('Connected to MongoDB!!!')});

//const connectDB = async ()=> {
//    const conn= await mongoose.connect(process.env.MONGO_URI,{
//        useNewUrlParser : true,
//        useUnifiedTopology : true
//    });


//    console.log('Pituck');
//    console.log('MongoDB Connected: '+ conn.connection.host);

//}

module.exports = connectDB;
