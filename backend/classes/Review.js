const pool = require("../DB/db");

class Review {
  constructor(review) {
    this.restaurantId = review.restaurantId;
    this.userId = review.userId;
    this.username = review.username;
    this.msg = review.msg;
    this.rating = review.rating;
  }

  async save() {
    try {
      const savedReview = await pool.query(
        `INSERT INTO reviews (username, review, rating, user_id, restaurant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [this.username, this.msg, this.rating, this.userId, this.restaurantId]
      );
      return savedReview.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error in db");
    }
  }
}

module.exports = Review;
