const mongoose = require('mongoose');
 const rider_collection =  require('./userModel');
 const Driver_collection = require('./DriverModel');
mongoose.connect("mongodb://127.0.0.1:27017/RiderManagement_system")
.then(()=>{console.log("mongoose connection successfull")})
.catch((err)=>{console.log(err)});