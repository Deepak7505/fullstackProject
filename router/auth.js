const express = require('express');
require('../models/mongoConnection');
const rider_collection = require('../models/userModel');
const Driver_collection = require('../models/DriverModel');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookiparser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const async = require('hbs/lib/async');
const secretkey = "nodejskey";



 
router.get("/riderregistration", (req, res) => {
    res.render('Riderregistration');
})

  
router.get("/driverregistration",(req,res)=>{
    res.render('DriverRagistration');
})



router.post("/riderregistration", async (req, res) => {

    const {
        Name,
        Email,
        number,
        password,
        confirmPassword,
        gender
    } = req.body;
    console.log(req.body);
    const invalidField = (!Name || !Email || !number || !password || !confirmPassword || !gender);
    if (invalidField) {
        return res.status(422).json({ message: "plz fill the fields properly"});
    } 
 
    try {
        const riderExist = await rider_collection.findOne({ Email: Email });
        if (riderExist) {

            return res.status(422).json({ message: "rider already existe's"})

        }

        const rider = new rider_collection({ Name, Email, number, password, confirmPassword,gender });

        // genrating a token 

        const token = await rider.genrateAuthToken();
        console.log(`token part is ${token}`); 
        res.cookie("jwt",token,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true
        });
        

           await rider.save();
           await res.render('Riderlogin');      
    
     }catch (error) {
        console.log(error);
    }
});




router.post("/riderlogin", async (req, res) => {

    try {
        const { Email, password } = req.body;

        const riderlogin = await rider_collection.findOne({ Email: Email });


        if (riderlogin) {

            const isMatch = await bcrypt.compare(password, riderlogin.password);

            
           const token = await riderlogin.genrateAuthToken();
           console.log(`token part is ${token}`);
          
            res.cookie("jwt",token,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            });
            

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                let userM = req.body.Email;
                res.render('loginRiderPage',{userM});
            }


        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }

    } catch (error) {
        console.log(error);
    }

})


//// driver registresion 

router.post("/driverregistration", async (req, res) => {

    const {
        dName,
        Email,
        Dnumber,
        DAdhar,
        DWhical_number,
        Dwhical_name,
        Dpassword,
        Dconpassword,
        gender,
        Type
    } = req.body;
    const invalidField = (!dName || !Email || !Dnumber ||!DAdhar ||!DWhical_number ||!Dwhical_name || !Dpassword || !Dconpassword || !gender || !Type);
    if (invalidField) {
        return res.status(422).json({ message: "plz fill the fields properly" });
    } 
 
    try {
        const driverExist = await Driver_collection.findOne({ Email: Email });
        if (driverExist) {

            return res.status(422).json({ message: "Driver already exist's" })

        } 

        const Driver = new Driver_collection({ 
            dName,
            Email,
            Dnumber,
            DAdhar,
            DWhical_number,
            Dwhical_name,
            Dpassword,
            Dconpassword,
            gender,
            Type
        });

        // genrating a token 

        const token = await Driver.genrateAuthToken();
        console.log(`token part is ${token}`); 
        res.cookie("jwt",token,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true
        });

           await Driver.save(); 
           await res.render('DriverLogin');

     }catch (error) {
        console.log(error);
    }

});


router.post("/driverlogin", async (req, res) => {

    try {
        const { Email, Dpassword } = req.body;

        const driverlogin = await Driver_collection.findOne({ Email: Email });

        if (driverlogin) {

            const isMatch = await bcrypt.compare(Dpassword, driverlogin.Dpassword);

            
          const token = await driverlogin.genrateAuthToken();
          console.log(`token part is ${token}`);         
          
            res.cookie("jwt",token,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            });
            

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                let userM = req.body.Email;
                res.render('loginDriverpage',{userM});
            }


        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }

    } catch (error) {
        console.log(error);
    }

});



module.exports = router;