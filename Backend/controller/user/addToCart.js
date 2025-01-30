const CartModel = require("../../models/cartProduct");

async function addToCart(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userid;
    const isProductAvailable = await CartModel.findOne({ productId });
    if (isProductAvailable) {
      return res.json({
        message: "Product already added to cart",
        success: false,
        error: true,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newCart=new CartModel(payload)
    const saveProduct=await  newCart.save()
    res.json({
        data:saveProduct,
        message:"Product Added Successfully",
        success:true,
        error:false
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=addToCart
