const express = require("express")
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const cookieParser = require('cookie-parser');
const connectDB = require('./db/connectDB') 
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const nocache = require('nocache')

connectDB()

app.use(nocache());
app.use(session({
    secret:'mysecretKEy',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24  
    } 
    
})) 

app.set("view engine" ,"ejs" );

             
//to use static files we use public folder
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended :true}))
 

 
app.use("/user",userRoutes); 
app.use("/admin",adminRoutes)

app.get('/',(req,res)=>{
    res.render('layout') 
})

app.listen(8080,()=>{ 
    console.log("Server started on localhost8080");
     
}) 