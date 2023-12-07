import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:1000/api/products");
      console.log("data in logs: ", response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("CAUGHT ERROR: ", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {loading ? (
          "Loading Please Wait......"
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    // <div className="bg-red-50" key={index}>
                    //   {product.name}
                    //   {product.quantity}
                    //   {product.price}
                    // </div>
                    <Product product={product} key={index} getAllProducts={getAllProducts}/>
                  );
                })}
              </>
            ) : (
              <div>There are no products</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
