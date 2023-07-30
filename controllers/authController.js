const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
const User = require('../models/usermodel');
const Dealership = require('../models/Dealership');
const tokenUtil = require('../utils/tokenUtil');
const { generateRandomId } = require('../utils/idUtil')
const admin = require('../models/admin');
const user = require('../models/usermodel')
const {generateAdmin,generateUser,generateDealership,generateCar,generateDeal,generateSoldVehicle}=require('../utils/faker')


// admin registration
const registerAdmin = async(req, res)=>{
    try {
      // Extract the required data from the request body
      const { adminId, password } = req.body;
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const admin = new Admin( adminId, passwordHash );   
  
      // Save the user to the database
      await req.db.collection('admins').insertOne(admin);
  
      res.status(201).json({ message: 'admin registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Dealership login
const  loginAdmin = async(req, res) =>{
    try {
      const { adminId, password } = req.body;
  
      // Find the dealership in the database
      const admin = await req.db.collection('admins').findOne({adminId: adminId });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

       // Compare passwords
       
       const isMatch = await bcrypt.compare(password, admin.password);
       if (!isMatch) {
        
         return res.status(401).json({ error: 'Invalid credentials' });
       }
  
      // Generate 
      const token =tokenUtil.generateToken(adminId) ;
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  


// User registration
const registerUser = async(req, res)=>{
  try {
    // Extract the required data from the request body
    const { userEmail,  userLocation, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = generateRandomId()

    // Create a new user instance
    const user = new User( userEmail, userId, userLocation, passwordHash );

    // Save the user to the database
    await req.db.collection('users').insertOne(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// User login
const loginUser = async(req, res)=> {
  try {
    // Extract the required data from the request body
    const { userEmail, password } = req.body;

    // Find the user in the database
    const user = await req.db.collection('users').findOne({  user_email:userEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
   
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = tokenUtil.generateToken(user.userEmail);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Register a new dealership
const registerDealership= async(req, res) =>{
  try {
    const { dealershipEmail,dealershipName ,dealershipLocation ,  password } = req.body;

    // Check if the dealership already exists
    const existingDealership = await req.db.collection('dealerships').findOne({dealership_email: dealershipEmail });
    if (existingDealership) {
      return res.status(400).json({ error: 'Dealership already exists' });
    }

    // Generate a password hash
    const passwordHash = await bcrypt.hash(password, 10);
    const dealershipId = generateRandomId()
    // Create a new dealership instance
    const dealership = new Dealership( dealershipEmail, dealershipId,dealershipName,dealershipLocation ,passwordHash );

    // Save the dealership to the database
    await req.db.collection('dealerships').insertOne(dealership);

    res.status(201).json({ message: 'Dealership registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Dealership login
const loginDealership = async(req, res) =>{
  try {
    const { dealershipEmail, password } = req.body;

    // Find the dealership in the database
    const dealership = await req.db.collection('dealerships').findOne({dealership_email: dealershipEmail });
    if (!dealership) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

   // Compare passwords
   const isMatch = await bcrypt.compare(password, dealership.password);
   if (!isMatch) {
     return res.status(401).json({ error: 'Invalid credentials' });
   }

    // Generate JWT
    const token =tokenUtil.generateToken(dealershipEmail) ;
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const generate = async(req,res)=>{

    const {adminId,password}=generateAdmin()
    var passwordHash = await bcrypt.hash(password, 10);
      // Create a new user instance
      const admin = new Admin( adminId, passwordHash );
      
  
      // Save the user to the database
      await req.db.collection('admins').insertOne(admin);

      const {userEmail , userId,userLocation,userpassword }=generateUser()
     passwordHash = await bcrypt.hash(userpassword, 10);
      // Create a new user instance
      const user = new user(userEmail , userId,userLocation, passwordHash );
      
  
      // Save the user to the database
      await req.db.collection('users').insertOne(user);
      res.send({message:"generated successfully"})
}


module.exports ={registerAdmin, loginAdmin, registerUser, loginUser, registerDealership, loginDealership, generate}