const { ObjectId } = require('mongodb');
const Deal = require('../models/deal');

// Get all deals on a certain car
const getDealsOnCar = async(req, res, next)=> {
  try {
    const { carId } = req.params;
    const deals = await req.db.collection('deals').find({ car_id: carId }).toArray();
    res.json(deals);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all deals from a certain dealership
const getDealsFromDealership= async(req, res, next)=> {
  try {
    const { dealershipId } = req.params;
    const deals = await req.db.collection('deals').find({ dealership_id: dealershipId }).toArray();
    res.json(deals);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {getDealsFromDealership, getDealsOnCar}