const CartModel = require("../../models/cartProduct");

async function clearcart(req,res){
    try{
         // Assuming you have a Cart model and user authentication
         await CartModel.deleteMany({ userId: req.userid });
        
         res.json({
             success: true,
             message: "Cart cleared successfully"
         });
    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            success:false,
            error:true
        })
    }
}
module.exports=clearcart