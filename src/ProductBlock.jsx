import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

const ProductBlock = ({ product }) => {
  const { _id, name, price, newPrice, imageUrl, versions } = product;

  const [liked, setLiked] = useState(false); // Thêm state cho liked
  const { user } = useUser(); // Lấy thông tin người dùng từ context
  const navigate = useNavigate();

  // Lấy giá của phiên bản đầu tiên nếu có
  const versionPrice = versions && versions.length > 0 ? versions[0].price : price;

  // Tính toán phần trăm khuyến mãi
  const discountPercentage =
    versionPrice && newPrice
      ? Math.round(((versionPrice - newPrice) / versionPrice) * 100)
      : 0;

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
            setLiked(true); // Đánh dấu đã thích
            // Có thể điều hướng đến trang sản phẩm yêu thích
            // navigate("/likelist");
          } else {
            console.error("Lỗi khi thêm vào danh sách yêu thích:", response.data.message);
          }
        })
        .catch((error) => console.error("Lỗi khi thêm vào danh sách yêu thích:", error));
    } else {
      navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  };

  return (
    <Link to={`/product/${_id}`}>
      <div className="relative ml-6 flex flex-1 flex-col pl-7 transition-shadow duration-300 hover:shadow-2xl">
        {/* Phần khuyến mãi */}
        {discountPercentage > 0 && (
          <div className="absolute right-2 top-2 flex h-8 w-20 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {discountPercentage}% Giảm giá
          </div>
        )}
        <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-center text-sm font-medium text-gray-800 group-hover:text-gray-900">
          {name}
        </h3>
        <div className="mt-3 flex flex-row items-center">
          {/* Hiển thị Giá */}
          {newPrice ? (
            <>
              <p className="text-xs">
                <span className="line-through">{versionPrice}₫</span>
              </p>
              <p className="ml-2 text-lg font-semibold text-red-500">{newPrice}₫</p>
            </>
          ) : (
            <p className="text-xs">{versionPrice}₫</p>
          )}

          {/* Biểu tượng yêu thích */}
          <p
            className="ml-2 block text-slate-400 hover:text-[#ffd040]"
            onClick={(e) => {
              e.preventDefault(); // Ngừng điều hướng liên kết
              addToLikeList(); // Thêm sản phẩm vào danh sách yêu thích
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-current ${liked ? "text-red-500" : "text-gray-400"}`}
            />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductBlock;
