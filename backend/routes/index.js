const express = require('express');

const router = express.Router();


const userSignupController = require("../controller/user/userSignup")
const userSigninController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken");
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategorywiseProduct = require("../controller/product/getCategorywiseProduct")
const getProductDetail = require("../controller/product/getProductDetail")
const addToCartController = require("../controller/user/addtoCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddtoCartProduct = require("../controller/user/updateAddtoCartProduct")
const deleteAddtoCartProduct = require("../controller/user/deleteAddtoCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProductController = require("../controller/product/filterProduct")
router.post("/signup", userSignupController)
router.post("/signin", userSigninController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout);
// Admin panel 
router.get("/all-user", authToken, allUsers)
router.get("/update-user", authToken, updateUser)

//Product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategorywiseProduct)
router.post("/product-details", getProductDetail)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// user add to cart 
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddtoCartProduct)
router.post("/delete-cart-product", authToken, deleteAddtoCartProduct)



module.exports = router;