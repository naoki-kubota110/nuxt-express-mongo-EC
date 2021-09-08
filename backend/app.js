const express = require('express')
const app = express();

// Json形式のデータを利用
app.use(express.json())

// MongoDB接続
require('./mongodb');

const cors = require('cors')
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    optionsSuccessStatus: 200, 
  })
);
// Router
const userRouter = require("./routes/user")
app.use("/user",userRouter)
// Router


const port = 5000;
app.listen(port, () => console.log(`port number is ${port}`))