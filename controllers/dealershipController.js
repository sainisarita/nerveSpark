const { ObjectId } = require('mongodb');
const Dealership = require('../models/Dealership');

// Get all cars
const getAllCars = async(req, res, next) =>{
  try {
    const cars = await req.db.collection('cars').find().toArray();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all cars sold by the dealership
const getSoldCars =async(req, res, next) =>{
  try {
    const dealershipId = req.user.dealership_id; // Assuming the authenticated user is a dealership
    const soldCars = await req.db.collection('sold_vehicles').find({ dealership_id: dealershipId }).toArray();
    res.json(soldCars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports ={getAllCars, getSoldCars};