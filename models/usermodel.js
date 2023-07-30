class User {
  constructor(userEmail, userId, userLocation, password, vehicleInfo = []) {
    this.user_email = userEmail;
    this.user_id = userId;
    this.user_location = userLocation;
    this.password = password;
    this.vehicle_info = vehicleInfo;
  }
}

module.exports = User;
