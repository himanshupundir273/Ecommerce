const express=require('express');
const router=express.Router();
const userSignUpController=require("../controller/user/userSignUp")
const userSignIncontroller=require("../controller/user/userSignIn");
const authToken = require('../middleware/authToken');
const userDetails = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser  = require('../controller/user/updateUser');
const uploadProduct = require('../controller/product/uploadProduct');
const getProduct = require('../controller/product/getProduct');
const updateProduct = require('../controller/product/updateProduct');
const getCategoryProduct=require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCart = require('../controller/user/addToCart');
const countaddtocart = require('../controller/user/countaddtocart');
const addtoCartViewProduct = require('../controller/user/addtoCartViewProduct');
const updateAddtoCartProduct = require('../controller/user/updateAddtoCartProduct');
const deleteAddtoCart = require('../controller/user/deleteAddtoCart');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const createorder = require('../controller/user/createorder');
const verifypayment = require('../controller/user/verifypayment');
const clearcart = require('../controller/user/clearcart');

router.post("/signup",userSignUpController)
router.post("/signin",userSignIncontroller)
router.get("/user-details",authToken,userDetails)
router.get("/userLogout",userLogout)
// Admin Panel
router.get("/all-User",authToken,allUsers)
router.post("/update-User",authToken,updateUser)

// Product
router.post("/upload-Product",authToken,uploadProduct)
router.get("/get-product",getProduct)
router.post("/update-product",authToken,updateProduct)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)  
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)


// Add to Card
router.post("/addtocart",authToken,addToCart)
router.get("/countaddtocart",authToken,countaddtocart)
router.get("/viewcartproduct",authToken,addtoCartViewProduct)
router.post("/updatecartproduct",authToken,updateAddtoCartProduct)
router.post("/deletecartproduct",authToken,deleteAddtoCart)
router.post("/create-order",createorder)
router.post("/verify-payment",verifypayment)
router.post("/clear-cart",clearcart)

module.exports=router;