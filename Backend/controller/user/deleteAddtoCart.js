const CartModel = require("../../models/cartProduct");

async function deleteAddtoCart(req,res){
    try{
        const currentUser = req.userid;
        const productId = req.body._id;
        const deleteProduct=await CartModel.deleteOne({ 
            _id: productId,
        })
        res.status(200).json({
            message: "Product Deleted Successfully",
            data: deleteProduct,
            error: false,
            success: true
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
module.exports=deleteAddtoCart