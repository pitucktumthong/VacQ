const mongoose = require('mongoose');

const connectDB = (async ()=> {
    //mongoose.set("debug", true);
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
                    useNewUrlParser : true,
                    useUnifiedTopology : true
        });
        
        console.log('MongoDB Connected: '+ conn.connection.host);
    }
    catch(err)
    {
        console.log('Failed to connect mongoDB , error ='+ err);
    }

})();

module.exports = connectDB;
