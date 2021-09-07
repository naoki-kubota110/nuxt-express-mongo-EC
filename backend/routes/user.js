const express = require("express");
const  router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
router.use(express.json())

router.use(
  cors({
    origin: "http://localhost:3000", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

router.get("/all", async (req,res) => {
  const Users = await User.find({})
  res.status(200).json(Users)
})

router.post("/register", async (req,res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.json(savedUser)
  } catch(err){
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ message: 'user not found' })
    }

    const match = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!match){
      res.json({ message: 'password not correct' });
    } 
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    }
    const token = jwt.sign(payload, "secret")

    res.json({token});
  } catch (err) {
    console.log(err);
  }
});

router.get('/auth', async (req, res) => {
  try {
    const headers = req.headers
    console.log(headers)
    const bearToken = await req.headers["authorization"];
    const bearer = await bearToken.split(" ");
    const token = await bearer[1];

    const user = await jwt.verify(token, 'secret');
    res.json({ user });
  } catch (err) {
    res.sendStatus(403)
  }
});

module.exports = router;