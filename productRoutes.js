const express = require('express')

const {getAllProducts,getOneProduct,updateProductById,deleteProductById,createProduct} = require('../controller/productController.js')

const router = express();
const Product = require("../models/products.js");

router.use(express.json());

router.get("/",getAllProducts); 


//by ID
router.get("/:id", getOneProduct);


//update product by ID
router.put("/:id", updateProductById);


//delete product by id
router.delete("/:id", deleteProductById);


//create new product
router.post("/create", createProduct);


module.exports = router;