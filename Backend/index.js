const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes")
const cookieParser=require('cookie-parser')

const app = express();
app.use(cors({
  origin:'https://ecommerce-backend-mu-blue.vercel.app/',
  methods:["GET","PUT","POST","DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json({
        message:"server is running"
    });
})

app.use("/api",router);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to DB`);
    console.log(`Server is running on ${PORT}`);
  });
});
