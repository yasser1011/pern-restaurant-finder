const express = require("express");
const router = express.Router();
require("dotenv").config();
const pool = require("../DB/db");
const { auth, checkAdmin } = require("../middlewares/auth");
const Restaurant = require("../classes/Restaurant");
const {
  findAllRestaurants,
  findRestaurantById,
  editRestaurant,
  deleteRestaurant,
} = require("../utils/restaurant");

router.get("/", async (req, res) => {
  try {
    const restaurants = await findAllRestaurants();
    // console.log(restaurants);
    res.send(restaurants);
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

router.post("/register", auth, checkAdmin, async (req, res) => {
  // console.log("here", req.body);
  let { name, location, price_range, image } = req.body;
  if (!name || !location || !price_range || !image)
    return res.status(400).send("please enter all fields");

  price_range = parseInt(price_range);

  if (price_range > 5 || price_range < 1 || !Number.isInteger(price_range))
    return res
      .status(400)
      .send({ price_range, msg: "check price range value" });

  const newRestaurant = new Restaurant({ name, location, price_range, image });
  try {
    const savedRestaurant = await newRestaurant.save();
    // console.log(savedRestaurant);
    // res.send(savedRestaurant);
    res.send("saved");
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await findRestaurantById(req.params.id);
    res.send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

router.post("/edit/:id", auth, checkAdmin, async (req, res) => {
  let { name, location, price_range, image } = req.body;
  if (!name || !location || !price_range || !image)
    return res.status(400).send("please enter all fields");

  price_range = parseInt(price_range);

  if (price_range > 5 || price_range < 1 || !Number.isInteger(price_range))
    return res
      .status(400)
      .send({ price_range, msg: "check price range value" });

  try {
    const result = await editRestaurant(req.params.id, {
      name,
      location,
      price_range,
      image,
    });
    res.send("edited");
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

router.delete("/delete/:id", auth, checkAdmin, async (req, res) => {
  try {
    const results = await deleteRestaurant(req.params.id);
    res.send("deleted");
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

module.exports = router;
