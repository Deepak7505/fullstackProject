const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DriverSchema = mongoose.Schema({
    dName:{
       type:String,
       required:true
    },
    Email:{
       type:String,
       required:true
    },
    Dnumber:{
       type:Number,
       required:true
    },
    DAdhar:{
        type:Number,
        required:true
     },
     DWhical_number:{
        type:String,
        required:true
     },
     Dwhical_name:{
        type:String,
        required:true
     },
    Dpassword:{
       type:String,
       required:true
    },
    Dconpassword:{
       type:String,
       required:true
    },
    gender:{
      type:String,
      required:true
   },
   Type:{
      type:String,
      required:true
   },
    tokens:[{
      token:{
        type:String,
        required:true 
      }
    }]
});


// token generation midileware 
// mehods used for instance and to direct target it we use statics 
DriverSchema.methods.genrateAuthToken = async function(){
   try {
        const token = jwt.sign({_id:this._id.toString()},"mynameisdeepak");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
   } catch (error) {
      console.log(error);
   }
};



DriverSchema.pre('save',async function(next){
   if(this.isModified('Dpassword')){
      this.Dpassword = await bcrypt.hash(this.Dpassword,12);
      this.Dconpassword = await bcrypt.hash(this.Dconpassword,12);
   }
   next();
});

const Driver_collection =  new mongoose.model('Driver',DriverSchema);
module.exports = Driver_collection;