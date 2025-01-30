const ProductModel = require("../../models/productModel")

async function getCategoryWiseProduct(req,res){
    try{
        const {category}=req?.body;
        const product=await ProductModel.find({category})
        res.json({
            data:product,
            message:"product found ",
            error:false,
            success:true
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
module.exports=getCategoryWiseProduct