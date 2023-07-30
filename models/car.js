class Car {
    constructor( type, name, model, carInfo = {}) {
      
     this.type = type;
      this.name = name;
      this.model = model;
      this.car_info = carInfo;
    }
  }
  
  module.exports = Car;
  