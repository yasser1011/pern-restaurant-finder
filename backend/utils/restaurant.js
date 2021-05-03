const pool = require("../DB/db");

const findAllRestaurants = async () => {
  try {
    const restaurants = await pool.query(
      "SELECT * from restaurants left join (SELECT restaurant_id, count(*), trunc(Avg(rating), 2) as average_rating from reviews GROUP by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    return restaurants.rows;
  } catch (error) {
    console.log(error);
    throw new Error("error in db");
  }
};

const findRestaurantById = async (id) => {
  id = parseInt(id);
  if (!Number.isInteger(id)) {
    return "not found";
  }
  try {
    const restaurant = await pool.query(
      "SELECT * from restaurants left join (SELECT restaurant_id, count(*), trunc(Avg(rating), 2) as average_rating from reviews GROUP by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where restaurants.id = $1",
      [id]
    );
    const reviews = await pool.query(
      "select * from reviews where restaurant_id = $1",
      [id]
    );
    return restaurant.rows[0]
      ? { restaurant: restaurant.rows[0], reviews: reviews.rows }
      : "not found";
  } catch (error) {
    console.log(error);
    throw new Error("error in db");
  }
};

const editRestaurant = async (id, restaurant) => {
  const { name, location, price_range, image } = restaurant;
  try {
    const results = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3, image = $4 WHERE id = $5",
      [name, location, price_range, image, id]
    );
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("error in db");
  }
};

const deleteRestaurant = async (id) => {
  try {
    const results = await pool.query(
      "DELETE FROM reviews WHERE restaurant_id = $1",
      [id]
    );

    const results1 = await pool.query("DELETE FROM restaurants WHERE id = $1", [
      id,
    ]);
    return results1;
  } catch (error) {
    console.log(error);
    throw new Error("error in db");
  }
};

module.exports = {
  findAllRestaurants,
  findRestaurantById,
  editRestaurant,
  deleteRestaurant,
};
