const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "server is running"
  });
});

app.use("/api", router);

// Export the Express app as a serverless function
module.exports = async (req, res) => {
  await connectDB();
  app(req, res);
};