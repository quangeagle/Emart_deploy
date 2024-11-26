import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

const Shipping = () => {
  const { user } = useUser(); // Lấy user từ UserContext
  const userId = user.id;
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
    selectedDate: "",
    selectedTime: "",
    paymentMethod: "COD",
    note: "",
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3005/cart/${userId}`)
        .then((response) => {
          if (response.data && Array.isArray(response.data.cartItems)) {
            setCartItems(response.data.cartItems);
          } else {
            console.error(
              "Received data is not in the expected format:",
              response.data
            );
            setCartItems([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [userId]);

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const orderItems = cartItems
      .filter(
        (item) =>
          item.versionId &&
          item.quantity &&
          item.versionName &&
          item.versionPrice &&
          item.versionImage
      )
      .map((item) => ({
        versionId: item.versionId,
        quantity: item.quantity,
        name: item.versionName,
        price: item.versionPrice,
        imageUrl: item.versionImage,
      }));

    console.log("Sending orderItems:", orderItems);

    axios
      .post("http://localhost:3007/ship/themship", {
        ...shippingInfo,
        userId,
        orderItems,
      })
      .then((response) => {
        console.log("Shipping info saved successfully");
      })
      .catch((error) => {
        console.error("Error saving shipping info:", error);
      });
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Thông tin Giỏ Hàng
      </h2>

      {/* Giỏ hàng */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <table className="w-full table-auto border-collapse border-2">
          <thead>
            <tr>
              <th className="border-2 p-3 text-left">Hình ảnh</th>
              <th className="border-2 p-3 text-left">Tên phiên bản</th>
              <th className="border-2 p-3 text-left">Số lượng</th>
              <th className="border-2 p-3 text-left">Giá</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) =>
                item.versionName && item.versionPrice && item.versionImage ? (
                  <tr key={item._id || item.versionId}>
                    <td className="border p-3">
                      <img
                        src={item.versionImage}
                        alt="Version Image"
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="border-2 p-3">{item.versionName}</td>
                    <td className="border-2 p-3">{item.quantity}</td>
                    <td className="border-2 p-3">{item.versionPrice}₫</td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="4" className="border p-3 text-center">
                  Giỏ hàng trống
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thông tin giao hàng */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Thông tin giao hàng</h3>

        <div className="space-y-4">
          {/* Địa chỉ */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Tên */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Tên:</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Ngày giao hàng */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Ngày giao hàng:</label>
            <input
              type="date"
              name="selectedDate"
              value={shippingInfo.selectedDate}
              min={formatDate(today)}
              max={formatDate(maxDate)}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Giờ giao hàng */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Giờ giao hàng:</label>
            <input
              type="time"
              name="selectedTime"
              value={shippingInfo.selectedTime}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>

          {/* Phương thức thanh toán */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Phương thức thanh toán:
            </label>
            <select
              name="paymentMethod"
              value={shippingInfo.paymentMethod}
              onChange={handleShippingInfoChange}
              className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
            >
              <option value="COD">Thanh toán khi nhận hàng (COD)</option>
              <option value="CreditCard">Thẻ tín dụng</option>
            </select>
          </div>

          {/* Ghi chú */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Ghi chú:</label>
            <textarea
              name="note"
              value={shippingInfo.note}
              onChange={handleShippingInfoChange}
              className="rounded-lg border p-3 focus:border-[#ffd040] focus:outline-none"
            />
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Xác nhận
          </button>
          <Link to="/Payment">
            <button className="ml-2 rounded bg-yellow-400 px-4 py-2 text-white">
              Thanh Toán
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
