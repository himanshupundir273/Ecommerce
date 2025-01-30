const uploadProductPermission = require("../../helpers/uploadProductPermission");
const ProductModel = require("../../models/productModel");

async function updateProduct(req, res) {
  try {
    if (!uploadProductPermission(req.userid)) {
      throw new Error("Permission denied");
    }
    const {_id, ...resBody}=req.body
    const updateProductdetail=await ProductModel.findByIdAndUpdate(_id,resBody)

    res.json({
        message:"Product Update Successfully",
        error:false,
        success:true
    })
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = updateProduct;