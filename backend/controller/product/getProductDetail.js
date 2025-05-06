const productModel = require("../../models/productModel")
const getProductDetail = async (req, res) => {
    try {
        const { productId } = req.body
        const Product = await productModel.findById(productId)
        res.json({
            data: Product,
            message: "Ok",
            success: true,
            error: false
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductDetail