
const Car = require("../models/car");
const {generateCar} = require("../utils/faker")
const { ObjectId} = require('mongodb')



//add cars

const addCar = async(req, res)=> {
  try {
    const dealershipId =new ObjectId( req.dealershipId);
    const carsCollection = req.db.collection('cars');
    const dealershipsCollection = req.db.collection('dealerships');

    // Generate car data
    const carData = generateCar();
    
    // Insert car data into the "cars" collection
    const insertedCar = await carsCollection.insertOne(carData);

    // Retrieve the generated car ID
    const carId = insertedCar.insertedId;

    // Retrieve the dealership document
    const dealership = await dealershipsCollection.find({_id: dealershipId});
    
    if (!dealership.length!=0) {
      return res.status(404).json({ error: 'Dealership not found' });
    }
    console.log(dealership)
    // Add the car ID to the dealership's "cars" array
    if (!dealership.cars) {
      dealership.cars = [];
    }
    dealership.cars.push(carId);

    // Update the dealership document with the modified "cars" array
    await dealershipsCollection.updateOne({ _id: dealershipId }, { $set: { cars: dealership.cars } });

    console.log('Car added to dealership successfully.');
    res.send({ message: 'Car added' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Get all cars
const getAllCars = async(req, res, next)=> {
  try {
    const cars = await req.db.collection('cars').find().toArray();
    res.json(cars);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all cars in a dealership
const getCarsInDealership= async(req, res, next)=> {
  try {
    const { dealershipId } = req.params;
    const cars = await req.db.collection('cars').find({ dealership_id: dealershipId }).toArray();
    res.json(cars);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {addCar, getAllCars, getCarsInDealership}