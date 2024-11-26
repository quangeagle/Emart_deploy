import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function SupplierProducts() {
  const { supplierId } = useParams(); // Lấy ID nhà cung cấp từ URL
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name-asc"); // Default sorting: Name A-Z

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

  // Handle sorting by price or name
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Sort products based on selected sort criteria
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (!supplier || products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Thiết kế lại thẻ sản phẩm
  const ProductBlock = ({ product }) => {
    const { _id, name, price, imageUrl, versions } = product;

    const [liked, setLiked] = useState(false);

    // Lấy giá của phiên bản đầu tiên nếu có
    const versionPrice =
      versions && versions.length > 0 ? versions[0].price : price;

    // Xử lý hành động yêu thích/không yêu thích
    const addToLikeList = () => {
      setLiked(!liked);
      toast.success(
        liked
          ? "🎉 Sản phẩm đã được gỡ khỏi danh sách yêu thích!"
          : "🎉 Sản phẩm đã được thêm vào danh sách yêu thích!",
      );
    };

    return (
      <Link
        to={`/product/${_id}`}
        className="relative m-6 flex flex-1 flex-col p-7 transition-shadow duration-300 hover:shadow-2xl"
      >
        <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-inherit mt-4 text-center text-[12px] text-gray-800 group-hover:text-gray-900">
          {name}
        </h3>
        <div className="mt-3 flex flex-row items-center justify-between">
          Giá:{" "}
          <p className="text-[18px] font-medium text-red-400">
            {versionPrice} ₫
          </p>
          <div
            className={`ml-5 flex h-8 items-center justify-center rounded px-2 py-1 ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"} hover:bg-[#ffd040] hover:text-white`}
            onClick={(e) => {
              e.preventDefault(); // Ngừng điều hướng liên kết
              addToLikeList(); // Thêm sản phẩm vào danh sách yêu thích
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </Link>
    );
  };

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
      <div className="mx-auto mt-8 w-4/5 rounded-lg bg-white py-6">
        <div className="ml-16 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">Dành cho bạn</h2>
          {/* Sorting options */}
          <div className="mr-16 flex justify-end">
            <select
              className="rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-[#ffd040]"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
              <option value="price-asc">Giá: Thấp - Cao</option>
              <option value="price-desc">Giá: Cao - Thấp</option>
            </select>
          </div>
        </div>
        <div className="mt-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductBlock key={product._id} product={product} />
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default SupplierProducts;
