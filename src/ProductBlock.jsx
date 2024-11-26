import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify

const ProductBlock = ({ product }) => {
  const { _id, name, price, imageUrl, versions } = product;
  const [liked, setLiked] = useState(false); // State cho việc yêu thích sản phẩm
  const { user } = useUser(); // Lấy thông tin người dùng từ context
  const navigate = useNavigate(); // Điều hướng đến các trang khác

  // Lấy giá của phiên bản đầu tiên nếu có
  const versionPrice =
    versions && versions.length > 0 ? versions[0].price : price;

  // Xử lý hành động yêu thích/không yêu thích
  const addToLikeList = () => {
    if (user && user.id) {
      axios
        .post("http://localhost:3005/likelist/add", {
          userId: user.id,
          productId: _id,
          versionId: versions[0]._id, // Giả sử bạn thích phiên bản đầu tiên
          versionName: versions[0].name,
          versionPrice: versions[0].price,
          versionImage: versions[0].imageUrl,
        })
        .then((response) => {
          if (response.data.success) {
            setLiked(true); // Đánh dấu sản phẩm đã được yêu thích
          } else {
            console.error(
              "Lỗi khi thêm vào danh sách yêu thích:",
              response.data.message,
            );
          }
        })
        .catch((error) =>
          console.error("Lỗi khi thêm vào danh sách yêu thích:", error),
        );
    } else {
      navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  };

  return (
    <Link to={`/product/${_id}`}>
      <div className="relative m-6 flex flex-1 flex-col p-7 transition-shadow duration-300 hover:shadow-2xl">
        <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-inherit mt-4 text-center text-[18px] font-medium text-gray-800 group-hover:text-gray-900">
          {name}
        </h3>
        <div className="mt-3 flex flex-row items-center justify-between">
          {/* Hiển thị Giá */}
          Giá:
          <p className="flex text-left text-[18px] font-medium text-red-400">
            {versionPrice} ₫
          </p>
          {/* Biểu tượng yêu thích với khung */}
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
      </div>

      {/* Toast Container sẽ hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Link>
  );
};

export default ProductBlock;
