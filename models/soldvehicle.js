class SoldVehicle {
    constructor(vehicleId, carId, vehicleInfo = {}) {
      this.vehicle_id = vehicleId;
      this.car_id = carId;
      this.vehicle_info = vehicleInfo;
    }
  }
  
  module.exports = SoldVehicle;
  