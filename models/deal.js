class Deal {
    constructor(dealId, carId, dealInfo = {}) {
      this.deal_id = dealId;
      this.car_id = carId;
      this.deal_info = dealInfo;
    }
  }
  
  module.exports = Deal;
  