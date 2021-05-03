const express = require("express");
const router = express.Router();
require("dotenv").config();
const pool = require("../DB/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth } = require("../middlewares/auth");
const { findUserByName, findUserById } = require("../utils/user");
const User = require("../classes/User");

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).send({ msg: "please enter all fields" });
  }
  if (password !== confirmPassword) {
    return res.status(400).send({ msg: "passwords dont match" });
  }
  const user = await findUserByName(username);
  //   console.log(user);
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    role: "user",
  });
  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET);
    res.send({
      user: {
        id: savedUser.id,
        username: savedUser.username,
        role: savedUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "error happened in server" });
  }
});

//login and give the token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "enter fields" });

  //find user by his username
  const user = await findUserByName(username);
  if (!user)
    return res
      .status(400)
      .json({ msg: "user doesnt exist with this username and password" });

  //checking if password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send({ msg: "wrong password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    //get user id from token
    const verified = jwt.verify(token, process.env.JWT_SECRET); //if it doesnt verify it goes to the catch
    //console.log(verified);
    if (!verified) return res.json(false);
    //find user from db by token id
    const user = await findUserById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    console.log("err");
    res.status(500).json({ msg: e.message });
  }
});

router.get("/getUser", auth, async (req, res) => {
  const user = await findUserById(req.user);
  if (!user) return res.send("token verification failed");
  res.json({
    user: { id: user.id, username: user.username, role: user.role },
  });
});

module.exports = router;
