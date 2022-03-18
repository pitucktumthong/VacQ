const mongoose = require('mongoose');
const HospitalSchema = new mongoose.Schema({
    name : {
        type:String,
        require:[true,'Please add name'],
        unique:true,
        trim: true,
        maxlength:[50,'Name cannot be more than 50 characters']
    },
    address : {
        type: String,
        require: [true,'Please add an address']
    },
    district :{
        type: String,
        require:[true,'Please add a district']
    },
    province : {
        type: String,
        require:[true,'Please add a province']
    },
    postalcode : {
        type: String,
        require:[true,'Please add a postalcode'],
        maxlength: [5,'Postalcode cannot be more than 5 digits']
    },
    tel : {
       type : String
    }, 
    region : {
        type: String,
        require:[true,'Please add a region']
    }

},  
{
    toJSON: {virtuals:true},
    toObject:{virtuals:true},
    id:false
});

//Reverse populate with virtuals
HospitalSchema.virtual('appointments',{
    ref:'Appointment',
    foreignField:'hospital',
    localField:'_id',    
    justOne:false
}
);

// Cascade delete appointments when a hospital is delete
HospitalSchema.pre('remove',async function(next){
    console.log('Appointments being removed from hospital '+this._id);
    await this.model('Appointment').deleteMany({hospitals:this._id});
    next();

});


module.exports = mongoose.model('Hospital',HospitalSchema);
