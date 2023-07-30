const { ObjectId } = require('mongodb');
const SoldVehicle = require('../models/soldvehicle');


 
// Get all vehicles owned by a user
const getVehiclesByUser= async(req, res, next)=> {
  try {
    const { userId } = req.params;
    const vehicles = await req.db.collection('sold_vehicles').find({ user_id: userId }).toArray();
    res.json(vehicles);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Add a new vehicle to the list of sold vehicles after a deal is made
const addSoldVehicle =async(req, res, next) =>{
  try {
    const dealershipId = req.user.dealership_id; // Assuming the authenticated user is a dealership
    const { carId, vehicleInfo } = req.body;

    // Create a new sold vehicle record for the dealership
    const soldVehicle = new SoldVehicle(generateRandomId(), carId, vehicleInfo);
    const result = await req.db.collection('sold_vehicles').insertOne(soldVehicle);
    res.status(201).json({ message: 'Sold vehicle added successfully' });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {getVehiclesByUser, addSoldVehicle}