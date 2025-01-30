const ProductModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/uploadProductPermission");

async function uploadProduct(req, res) {
  try {
    const sessionUserId = req.body.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const uploadProduct = new ProductModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(200).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = uploadProduct;
