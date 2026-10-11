const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db")
const app = express();
app.use(express.json());
connectDB()

app.listen(5000, () => {
    console.log("Server is running !")
})