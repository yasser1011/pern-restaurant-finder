const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const Review = require("../classes/Review");

router.get("/", (req, res) => {
  res.send("reviews route");
});

router.post("/", auth, async (req, res) => {
  //the userId coming from auth middleware req.user
  let { username, msg, rating, restaurantId } = req.body;
  if (!username || !msg || !rating || !restaurantId)
    return res.status(400).send("please enter all fields");

  rating = parseInt(rating);

  if (rating > 5 || rating < 1 || !Number.isInteger(rating))
    return res.status(400).send({ rating, msg: "check rating value" });

  const newReview = new Review({
    restaurantId,
    userId: req.user,
    username,
    msg,
    rating,
  });
  try {
    const savedReview = await newReview.save();
    res.send(savedReview);
  } catch (error) {
    console.log(error);
    res.status(401).send("error in server");
  }
});

module.exports = router;
