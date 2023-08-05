const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const async = require('hbs/lib/async');

const RiderSchema = mongoose.Schema({
     Name:{
        type:String,
        required:true
     },
     Email:{
        type:String,
        required:true
     },
     number:{
        type:Number,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     confirmPassword:{
        type:String,
        required:true
     },
     gender:{
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
RiderSchema.methods.genrateAuthToken = async function(){
   try {
        const token = jwt.sign({_id:this._id.toString()},"mynameisdeepak");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
   } catch (error) {
      console.log(error);
   }
}



RiderSchema.pre('save',async function(next){
   if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,12);
      this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
   }
   next();
});

const rider_collection = new mongoose.model('Rider',RiderSchema);
module.exports = rider_collection;
