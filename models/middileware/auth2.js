const async = require('hbs/lib/async');
const jwt = require('jsonwebtoken'); 
const Driver_collection = require('../DriverModel');


const auth2 = async (req , res , next)=>{
      try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,"mynameisdeepak");
        console.log(verifyUser);
        const user =await Driver_collection.findOne({_id:verifyUser._id});
        console.log(user);
        req.token = token;
        req.user = user;
        next();

      } catch (error) {
        res.status(401).send(error)
      }
} 

module.exports = auth2; 