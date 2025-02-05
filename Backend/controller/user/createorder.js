const Razorpay = require('razorpay');
const crypto = require('crypto');
require("dotenv").config();


const razorpay = new Razorpay({
    key_id: "rzp_test_Gej5qgBQm4Kzcm",
    key_secret: "Bqjmh1nKV9v6tO01oQYkEgo8"
});

async function createorder(req,res){
    try{
        const options = {
            amount: req.body.amount,
            currency: 'INR',
            receipt: 'order_' + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            success:false,
            error:true
        })
    }
}
module.exports=createorder