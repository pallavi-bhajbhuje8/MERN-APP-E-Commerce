const addToCartModel = require("../../models/cardProduct");

const updateAddtoCartProduct = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
        const qty = req.body.quantity
        const updateproduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })

        })
        res.json({
            message: "Product updated",
            data: updateproduct,
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddtoCartProduct