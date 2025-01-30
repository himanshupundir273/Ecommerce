const CartModel = require("../../models/cartProduct");

async function updateAddtoCartProduct(req, res) {
    try {
        const currentUser = req.userid;
        const productId = req.body._id;
        const qty = req.body.quantity;

        // Fix: pass an object as filter to updateOne
        const updateProduct = await CartModel.updateOne(
            { 
                _id: productId,
            },
            {
                ...(qty && { quantity: qty })
            }
        );

        if (updateProduct.matchedCount === 0) {
            return res.status(404).json({
                message: "Cart item not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product Quantity Updated",
            data: updateProduct,
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

module.exports = updateAddtoCartProduct;