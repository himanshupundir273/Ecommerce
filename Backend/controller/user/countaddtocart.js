const CartModel = require("../../models/cartProduct");

async function countaddtocart(req,res){
    try{
        const userId=req.userid;
        const count=await CartModel.countDocuments({
            userId:userId
        })
        res.json({
            data:{
                count:count
            },
            message:"ok",
            error:false,
            success:true
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            success:false,
            error:true
        })
    }
}
module.exports=countaddtocart