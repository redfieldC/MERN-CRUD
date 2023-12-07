const Product = require('../models/products.js');
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500);
    throw new Error(error.message);
  }
});

const getOneProduct = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    response.status(200).json(product);
  } catch (error) {
    response.status(500);
    throw new Error(error.message);
  }
});

const updateProductById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndUpdate(id, request.body);

    if (!product) {
      response.status(404);
      throw new Error(`Product with id ${id} not found`);
    }

    const updatedProduct = await Product.findById(id);
    response.status(200).json(updatedProduct);
  } catch (error) {
    response.status(500);
    throw new Error(error.message);
  }
});

const deleteProductById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      response.status(404);
      throw new Error(`Product with id ${id} not found`);
    }

    response.status(200).json(product);
  } catch (error) {
    response.status(500);
    throw new Error(error.message);
  }
});

const createProduct = async (request, response) => {
  try {
    const product = await Product.create(request.body);
    response
      .status(200)
      .json({ message: `Product ${product.name} created successfully` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  updateProductById,
  deleteProductById,
  createProduct,
};
