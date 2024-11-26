// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Footer  from './footer';
// import Header from './header';
// import AnhSanPham from "./assets/anhsanpham.png";
// import { faX } from "@fortawesome/free-solid-svg-icons";
// import React from 'react';
// import './index.css'

// function LikeList() {
//   return (
//     <>
//       <Header />
//       <body className="body_like">
//         <div className="container">
//           <div className="likelist">
//             <div className="tieude">
//               <p className="likelist">Danh sách yêu thích</p>
//             </div>
//             <div className="table w-full">
//               <table className="like_list">
//                 <tr>
//                   <th className="col1">Hình ảnh</th>
//                   <th className="col2">Tên sản phẩm</th>
//                   <th className="col3">Kiểu</th>
//                   <th className="col4">Hàng hóa</th>
//                   <th className="col5">Đơn giá</th>
//                   <th className="col6">Thao tác</th>
//                 </tr>
//                 <tr>
//                   <td className="col1">
//                     <img
//                       className="anhsanpham"
//                       src={AnhSanPham}
//                       alt="ảnh sản phẩm"
//                     ></img>
//                   </td>
//                   <td className="col2">Dầu Đậu Nành Tường An 1L</td>
//                   <td className="col3">000000000001015477</td>
//                   <td className="col4">Còn hàng</td>
//                   <td className="col5">45.900đ</td>
//                   <td className="col6">
//                     <button className="themvaogio">THÊM VÀO GIỎ</button>
//                     <button className="xoa">
//                       <FontAwesomeIcon className="X" icon={faX} />
//                     </button>
//                   </td>
//                 </tr>
//               </table>
//             </div>
//             <div className="nut_tieptuc">
//               <button className="tieptuc">TIẾP TỤC</button>
//             </div>
//           </div>
//         </div>
//       </body>
//       <Footer />
//     </>
//   );
// }

// export default LikeList;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import { faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext"; // Assuming you have a UserContext to get the logged-in user's ID
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify

function LikeList() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser(); // Lấy user từ UserContext
  const userId = user.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3005/likelist/${userId}`)
      .then((response) => {
        setFavorites(response.data.favorites);
        console.log("cc", response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite list:", error);
      });
  }, [userId]);

  const removeFromLikeList = (productId, versionId) => {
    axios
      .post("http://localhost:3005/likelist/remove", {
        userId,
        productId,
        versionId,
      })
      .then((response) => {
        setFavorites(
          favorites.filter(
            (fav) =>
              !(fav.productId === productId && fav.versionId === versionId),
          ),
        );
        console.log(response.data.message); // Log phản hồi từ server
      })
      .catch((error) => {
        console.error(
          "Error removing from likelist:",
          error.response?.data || error.message,
        );
      });
  };

  const handleAddToCart = (favorite, quantity = 1) => {
    axios
      .post("http://localhost:3005/cart/add", {
        userId,
        productId: favorite.productId,
        versionId: favorite.versionId,
        quantity,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("🎉 Sản phẩm đã được thêm vào giỏ hàng thành công!"); // Hiển thị thông báo thành công
        } else {
          toast.error(response.data.message || "Lỗi thêm vào giỏ hàng");
        }
      })
      .catch((error) => {
        toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
        console.error(error.response?.data || error.message);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-screen-lg p-6">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Danh sách yêu thích
            </h1>
          </div>

          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Tên phiên bản
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Đơn giá
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite) => {
                  const isInCart = false; // Giả sử kiểm tra từ backend hoặc state của giỏ hàng
                  return (
                    <tr
                      key={favorite._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-6 py-4">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={favorite.versionImage}
                          alt="ảnh sản phẩm"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {favorite.versionName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {favorite.versionPrice}đ
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            disabled={isInCart}
                            className={`rounded-md px-4 py-2 text-white ${
                              isInCart
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                            onClick={() => handleAddToCart(favorite)}
                          >
                            {isInCart ? "Đã thêm" : "Thêm vào giỏ"}
                          </button>

                          <button
                            className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                            onClick={() =>
                              removeFromLikeList(
                                favorite.productId,
                                favorite.versionId,
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faX} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-right">
            <button className="rounded-lg bg-[#ffd040] px-4 py-2 text-white hover:bg-[#ffd000]">
              TIẾP TỤC
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default LikeList;
