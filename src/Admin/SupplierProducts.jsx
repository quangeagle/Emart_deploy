import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SupplierProducts() {
  const { supplierId } = useParams(); // Lấy ID nhà cung cấp từ URL
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Lấy thông tin nhà cung cấp
    axios
      .get(`http://localhost:3005/supplier/${supplierId}`)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch((error) => {
        console.error("Error fetching supplier:", error);
      });

    // Lấy các sản phẩm của nhà cung cấp
    axios
      .get(`http://localhost:3005/product/products?supplierId=${supplierId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [supplierId]);

  if (!supplier || products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10">
      {/* Header - Nhà cung cấp */}
      <div className="mx-auto w-4/5 rounded-lg bg-white p-6 shadow">
        <div className="flex items-center gap-6">
          <img
            src={supplier.image}
            alt={supplier.name}
            className="h-28 w-28 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {supplier.username}
            </h1>
            {supplier.address && (
              <p className="mt-4 text-gray-500">
                <strong>Địa chỉ:</strong> {supplier.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mx-auto mt-8 w-4/5">
        <h2 className="text-2xl font-semibold text-gray-700">Dành cho bạn</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative overflow-hidden rounded-lg bg-white shadow group hover:shadow-lg"
            >
              {/* Ảnh sản phẩm */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-56 w-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Nội dung sản phẩm */}
              <div className="p-4">
                <h3 className="text-md truncate font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="mt-2 text-lg font-bold text-red-500">
                  {product.price}₫
                </p>
                <button className="mt-4 w-full rounded bg-yellow-500 px-4 py-2 text-white transition-all hover:bg-yellow-600">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupplierProducts;
