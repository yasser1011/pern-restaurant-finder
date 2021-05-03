const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pg = require("pg");
const pool = require("./DB/db");
const usersRoute = require("./routes/users");
const restaurantsRoute = require("./routes/restaurants");
const reviewsRoute = require("./routes/reviews");

app.use(cors());
app.use(express.json({ limit: "30MB" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", usersRoute);
app.use("/restaurants", restaurantsRoute);
app.use("/reviews", reviewsRoute);

app.get("/", (req, res) => {
  res.send("home route");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  pool.connect().then(() => console.log("connected to db"));
});
