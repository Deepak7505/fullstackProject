const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookiparser = require("cookie-parser");
const exp = require("constants");
const auth = require('./models/middileware/auth');
const async = require("hbs/lib/async");
const auth2 = require("./models/middileware/auth2");
  
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./models/mongoConnection');


app.use(require('./router/auth'));
app.use(require('./router/index'));
app.use(cookiparser('SecretStringForCookies'));

const cssPath = path.join(__dirname,'./public/css');
const imagePath = path.join(__dirname,'./public');
const script = path.join(__dirname,'./public/script');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(cssPath));
app.use(express.static(imagePath));
app.use(express.static(script));

 

app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/loginRiderPage", auth , (req,res)=>{
    res.render("loginRiderPage");
})
app.get("/loginDriverpage",auth2,(req,res)=>{
    res.render("loginDriverpage");
});

app.get("/logout",auth,async(req,res)=>{

    try {
        req.user.tokens = [];
        res.clearCookie("jwt");
        res.redirect("home");
        console.log("logout suceesfully");
        await req.user.save();
    } catch (error) {
        res.status(500).send(error);        
    }
})

app.get("/logoutDriver",auth2,async(req,res)=>{

    try {
        req.user.tokens = [];
        res.clearCookie("jwt");
        res.redirect("home");
        console.log("logout suceesfully");
        await req.user.save();
    } catch (error) {
        res.status(500).send(error);        
    }
})
app.get("/driverregistration", (req,res)=>{
    res.render('DriverRagistration');
})


app.get("/driverlogin",(req,res)=>{
    res.render('DriverLogin');
})

app.get("*",(req,res)=>{
    res.render('home');
})


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})