const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: "rzp_test_Gej5qgBQm4Kzcm",
    key_secret: "Bqjmh1nKV9v6tO01oQYkEgo8"
});

async function verifypayment(req,res){
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;
    
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', "Bqjmh1nKV9v6tO01oQYkEgo8")
            .update(body.toString())
            .digest('hex');
    
        const isAuthentic = expectedSignature === razorpay_signature;
    
        if (isAuthentic) {
            res.json({ success: true });
        }
    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            success:false,
            error:true
        })
    }
}
module.exports=verifypayment