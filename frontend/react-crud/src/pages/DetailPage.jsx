import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Name: {product.name}</h1>
      <img src={product.image} alt={product.name} className="mb-4 w-full h-48 object-cover" />
      <p className="text-sm mb-2">Quantity: {product.quantity}</p>
      <p className="text-sm mb-2">Price: {product.price}</p>
      <div className="mt-2 flex gap-4">
        {/* Add buttons or links for additional actions if needed */}
      </div>
    </div>
  );
};

export default DetailPage;
