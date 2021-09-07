const express = require('express');
const app = express();
const  mongoose = require('mongoose');
require('./mongodb');

const userRouter = require("./routes/user")


const port = 5000;


app.use("/user",userRouter)

app.listen(port, () => console.log(`port number is ${port}`))