const ProductModel =require("../../models/productModel")

async function getCategoryProduct(req,res){
    try{
        const productCategory =await ProductModel.distinct("category")
        console.log("category",productCategory)
        const productByCategory=[]
        for(const category of productCategory){
            const product=await ProductModel.findOne({category})
            if(product){
                productByCategory.push(product)

            }
        }
        res.json({
            message:"category are present below",
            data:productByCategory,
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
module.exports=getCategoryProduct
