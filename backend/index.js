//dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5010;
const connectDB = require("./dbConnections");

const app = express();
app.use(express.json());
connectDB();

//routes will be here:


app.listen(PORT, () => console.log("it's up and running on port 5008"))