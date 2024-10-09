const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const { default: mongoose } = require('mongoose')

const loadLogin = async (req,res) => {

  res.render('admin/login',{message:""})

}

const login = async (req,res) => {
  try {
    const {email,password} = req.body

    const admin = await adminModel.findOne({email})
    

    if(!admin){
      console.log('Admin not found');
      
       return res.render('admin/login',{message: 'invalid username'})
      }
    const isMatch = await bcrypt.compare(password,admin.password)

    if(!isMatch){
      console.log('password did not match');
      
       return res.render('admin/login',{message: 'password'})
      }
      req.session.admin = true

      res.redirect('/admin/dashboard',)

  } catch (error) {
  console.log('Error during login',error);
  res.render('admin/login',{message:'Something went wrong, please try again'})
  
  }
}

const loadDashboard = async (req,res) => {
  try {
    
    const admin = req.session.admin
    if(!admin){
    
     return res.redirect('/admin/login')
    }    
      const users = await userModel.find({})

      
      res.render('admin/dashboard',{ users })

  } catch (error) {
    console.log('Error loading dashboard :' ,error);
    res.render('admin/login',{message:'Failed ot load dashboard please try again'})
    
  }
} 

const logout = (req,res) => {

  req.session.admin = null;
  res.redirect('/admin/login')
} 

const editUser=async(req,res)=>{
  let userId = new mongoose.Types.ObjectId(req.body.id)
  userModel.findByIdAndUpdate(userId,{$set:{email:req.body.email}}).then((res)=> console.log(res))

  res.redirect('/admin/dashboard')
}

const deleteUser=async(req,res)=>{

  try {
    const userId = req.params.id;
    console.log('Deleting user with ID:',userId);
    
    await userModel.deleteOne({ _id: userId });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log('Error deleting user:', error);
    res.redirect("/admin/dashboard");
  }
};




const loadEditUser = (req,res)=>{
  let user = req.params;

  res.render("admin/edit",{user})
  
  
}

const loadCreateUserForm = (req, res) => {
  try {
    res.render('admin/createUser',{message:''}); // Render the EJS template for the create user form.
  } catch (error) {
    console.log('Error loading user creation form:', error);
    res.redirect('/admin/dashboard');
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render('admin/createUser', { message: 'User with this email already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log('Error creating user:', error);
    res.render('admin/createUser', { message: 'Failed to create user. Please try again.' });
  }
};

const searchUser = async (req, res) => {
  try {
      const query = req.query.query || ''; // Get the search query from the request, default to empty string
      const users = await userModel.find({
          email: { $regex: query, $options: 'i' }
      }); // Search for users by email (case-insensitive)

      // Render the dashboard page with filtered users
      res.render('admin/dashboard', { users ,query});
  } catch (error) {
      console.error('Error during search:', error);
      res.status(500).render('admin/dashboard', { users: [], message: 'Error during search' });
  }
};


module.exports = {
  loadLogin,
  login,
  loadDashboard ,
  logout,
  editUser,
  deleteUser,
  loadEditUser,
  loadCreateUserForm,
  createUser,
  searchUser
}