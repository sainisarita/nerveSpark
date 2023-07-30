class Dealership {
    constructor(dealershipEmail, dealershipId, dealershipName, dealershipLocation, password, cars = [], deals = [], soldVehicles = []) {
      this.dealership_email = dealershipEmail;
      this.dealership_id = dealershipId;
      this.dealership_name = dealershipName;
      this.dealership_location = dealershipLocation;
      this.password = password;
      this.cars = cars;
      this.deals = deals;
      this.sold_vehicles = soldVehicles;
    }
  }
  
  module.exports = Dealership;
  