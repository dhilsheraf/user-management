const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltround = 10;


const signUpUser = async (req,res) => {

   
  try {
    
     const {email,password} = req.body
       
     const user = await userSchema.findOne({email})

     if(user) return res.render('user/signup', {message: 'User already exists'})
     
      const hashedPassword = await bcrypt.hash(password , saltround)  


     const newUser = new userSchema({
      email,
      password:hashedPassword
     })

     await newUser.save()

     res.render('user/login',{message : 'User created Successfully'})

  } catch (error) {

    res.render('user/signup',{message: "Something went wrong"})
    
  }

}



const logout = (req,res) => {

  req.session.user = null
  res.redirect('/user/login')

}

const login = async (req,res) => {
   
    try {
      const {email,password} = req.body

      const user = await userSchema.findOne({email})

      if(!user)  return res.render('user/login',{message:"User doesn't exist"})

       const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch) return res.render('user/login',{message:"Incorrect password"}) 
   
       req.session.user = true
       req.session.user = {
        email: user.email,
        isLoggedIN:true
       }

        res.render('user/home',{message: 'Login successfull',email:user.email.toUpperCase()})
    } catch (error) {
      res.render('user/login',{message:"Something went wrong"})
      
    }

}

const loadSignUp = (req,res)=>{
     res.render('user/signup',{message:""})
}

const loadLogin = (req,res)=>{
  res.render('user/login',{message: ""})
}

const loadHome = (req,res) => {
  
  res.render("user/home",{message:"",email:""})
}



module.exports = {
  signUpUser,
  
  loadSignUp,
  
  loadLogin,

  login,
  
  loadHome,
  
  logout,

}