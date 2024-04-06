const express=require("express");
const { createProduct, getAllProducts,orderproduct, getSingleProduct, deleteProduct, updateProduct } = require("../controller/productController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");


const productRoute=express.Router();

productRoute.post("/create" , createProduct)

productRoute.get("/getproducts",getAllProducts)
productRoute.get("/orderproduct/:id",orderproduct)
productRoute.get("/getproducts/:id",getSingleProduct)

productRoute.delete("/getproducts/:id", deleteProduct)

productRoute.put("/getproducts/:id", updateProduct)

module.exports=productRoute;