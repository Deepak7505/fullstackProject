const express = require('express');
require('../models/mongoConnection');
const rider_collection = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
 


router.get("/",(req,res)=>{
    res.render('home')
});




router.get("/riderregistration",(req,res)=>{
    res.render('Riderregistration')
})

router.get("/riderlogin",(req,res)=>{
    res.render('Riderlogin');

})


module.exports = router;



