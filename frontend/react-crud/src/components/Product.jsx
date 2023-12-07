import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

const ConfirmDeleteToast = ({ closeToast, deleteProduct }) => (
  <div>
    <p>Are you sure you want to delete this product?</p>
    <div className="mt-2 flex gap-4">
      <button
        onClick={() => {
          deleteProduct();
          closeToast();
        }}
        className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
      >
        Yes
      </button>
      <button
        onClick={() => closeToast()}
        className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
      >
        No
      </button>
    </div>
  </div>
);

const Product = ({ product, getAllProducts }) => {
  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:1000/api/products/${product._id}`);
      toast.success("Deleted a product successfully");
      getAllProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded shadow-lg overflow-hidden">
        <Link to={`/detail/${product._id}`}>
          <img src={product.image} alt="" className="w-full h-28 object-cover cursor-pointer" />
        </Link>
        <div className="px-4 pt-2 pb-4">
          <Link to={`/detail/${product._id}`}>
            <h2 className="text font-semibold cursor-pointer">Name: {product.name}</h2>
          </Link>
          <div className="text-sm">Quantity: {product.quantity}</div>
          <div className="text-sm">Price: {product.price}</div>
          <div className="mt-2 flex gap-4">
            <Link
              to={`/edit/${product._id}`}
              className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
            >
              Edit
            </Link>
            <button
              onClick={() => toast.info(<ConfirmDeleteToast deleteProduct={deleteProduct} />)}
              className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
