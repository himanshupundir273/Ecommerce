const ProductModel = require("../../models/productModel")

async function getProductDetails(req,res){
    try{
        const {productId}=req?.body

        const product=await ProductModel.findById(productId)
        res.status(200).json
        ({
            data:product,
            error:false,
            success:true,
            message:"Got Product details"
        })
    }
    catch(err){
        res.status(400).json({
            message:err?.message||err,
            error:true,  
            success:false

        })
    }
}
module.exports=getProductDetails