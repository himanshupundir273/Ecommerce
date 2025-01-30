const ProductModel = require("../../models/productModel")

async function getProduct(req,res){
    try{
        const allProduct=await ProductModel.find().sort({createdAt:-1})
        res.json({
            message:"All Product",
            data:allProduct,
            success:true,
            error:false
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}
module.exports=getProduct