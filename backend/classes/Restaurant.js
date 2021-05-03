const pool = require("../DB/db");

class Restaurant {
  constructor(restaurant) {
    this.name = restaurant.name;
    this.location = restaurant.location;
    this.image = restaurant.image;
    this.price_range = restaurant.price_range;
  }

  async save() {
    try {
      const savedRestaurant = await pool.query(
        `INSERT INTO restaurants (name, location, price_range, image) VALUES ($1, $2, $3, $4) RETURNING *`,
        [this.name, this.location, this.price_range, this.image]
      );
      return savedRestaurant.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("error in db!");
    }
  }
}

module.exports = Restaurant;
