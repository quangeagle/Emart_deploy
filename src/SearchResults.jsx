// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductBlock from "./ProductBlock"; // Import component ProductBlock
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:3005/product/search?name=${query}`)
        .then((response) => {
          setProducts(response.data);
          setErrorMessage("");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setProducts([]);
            setErrorMessage("Không tìm thấy sản phẩm nào.");
          } else {
            console.error("Lỗi khi tìm kiếm:", error);
            setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
          }
        });
    }
  }, [query]);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-medium">Kết quả tìm kiếm cho: {query}</h1>
      {errorMessage ? (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductBlock key={product._id} product={product} />
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default SearchResults;
