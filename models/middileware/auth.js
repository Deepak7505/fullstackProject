const async = require('hbs/lib/async');
const jwt = require('jsonwebtoken'); 
const rider_collection = require('../userModel');


const auth = async (req , res , next)=>{
      try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,"mynameisdeepak");
        console.log(verifyUser);
        const user =await rider_collection.findOne({_id:verifyUser._id});
        console.log(user);
          
        req.token = token;
        req.user = user;

        next();

      } catch (error) {
        res.status(401).send(error)
      }
} 

module.exports = auth; 