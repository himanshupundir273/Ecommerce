const CartModel = require("../../models/cartProduct");

async function addtoCartViewProduct(req, res) {
    try {
        const currentUser = req.userid;
        const AllProduct = await CartModel.find({
            userId: currentUser
        }).populate("productId")
        
        res.status(200).json({
            data: AllProduct,
            message: "Products fetched successfully",
            error: false,
            success: true
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
}

module.exports = addtoCartViewProduct;