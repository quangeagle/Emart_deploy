import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { user } = useUser();
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
  const [errors, setErrors] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
    selectedDate: "",
    selectedTime: "",
    paymentMethod: "",
  });
  const navigate = useNavigate();

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
              response.data,
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
    setErrors({
      ...errors,
      [name]: "", // Clear the error for that field when the user changes the input
    });
  };

  const validate = () => {
    const {
      address,
      name,
      phone,
      email,
      selectedDate,
      selectedTime,
      paymentMethod,
    } = shippingInfo;

    let valid = true;
    let newErrors = {
      address: "",
      name: "",
      phone: "",
      email: "",
      selectedDate: "",
      selectedTime: "",
      paymentMethod: "",
    };

    // Validate required fields
    if (!address) {
      newErrors.address = "Vui lòng nhập địa chỉ.";
      valid = false;
    }
    if (!name) {
      newErrors.name = "Vui lòng nhập tên.";
      valid = false;
    }
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Vui lòng nhập email.";
      valid = false;
    }
    if (!selectedDate) {
      newErrors.selectedDate = "Vui lòng chọn ngày giao hàng.";
      valid = false;
    }
    if (!selectedTime) {
      newErrors.selectedTime = "Vui lòng chọn giờ giao hàng.";
      valid = false;
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán.";
      valid = false;
    }

    // Validate phone number (must be 10 digits and start with 0)
    const phoneRegex = /^0\d{9}$/;
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.";
      valid = false;
    }

    // Validate delivery date (must be today or future)
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    // Minimum date should be today
    const minDate = new Date(today);

    // Maximum date should be 3 days from today
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 3); // Maximum date should be in 3 days

    if (selectedDateObj < minDate || selectedDateObj > maxDate) {
      newErrors.selectedDate =
        "Ngày giao hàng chỉ được chọn trong 3 ngày kể từ hôm nay.";
      valid = false;
    }

    // Validate delivery time (must be between 9:00 and 18:00)
    const selectedTimeObj = new Date(`1970-01-01T${selectedTime}:00Z`);
    const startTime = new Date("1970-01-01T09:00:00Z");
    const endTime = new Date("1970-01-01T18:00:00Z");

    if (selectedTimeObj < startTime || selectedTimeObj > endTime) {
      newErrors.selectedTime =
        "Giờ giao hàng phải trong khoảng từ 9:00 sáng đến 18:00 tối.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderItems = cartItems.map((item) => ({
      versionId: item.versionId,
      quantity: item.quantity,
      name: item.versionName,
      price: item.versionPrice,
      imageUrl: item.versionImage,
    }));

    if (
      shippingInfo.paymentMethod === "COD" ||
      shippingInfo.paymentMethod === "CreditCard"
    ) {
      try {
        // Gửi request lưu đơn hàng
        await axios.post("http://localhost:3005/ship/themship", {
          ...shippingInfo,
          userId,
          orderItems,
        });
        toast.success("Đã lưu đơn hàng thành công!");

        // Chuyển hướng tùy theo phương thức thanh toán
        if (shippingInfo.paymentMethod === "COD") {
          navigate("/confirm"); // Chuyển đến trang xác nhận khi thanh toán COD
        } else {
          navigate("/Payment"); // Chuyển đến trang thanh toán khi chọn CreditCard
        }
      } catch (error) {
        console.error("Error saving shipping info:", error);
        toast.error("Không thể lưu đơn hàng. Vui lòng thử lại.");
      }
    } else {
      toast.error("Phương thức thanh toán không hợp lệ.");
      navigate("/"); // Quay lại trang chính nếu phương thức thanh toán không hợp lệ
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.versionPrice || 0) * item.quantity,
      0,
    );
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Thông tin Giỏ Hàng
      </h2>

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
                ) : null,
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

        {/* Tổng tiền */}
        <div className="mt-4 text-right">
          <h3 className="text-lg font-semibold">Tổng giá trị đơn hàng:</h3>
          <p className="text-xl font-bold text-red-500">{calculateTotal()}₫</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Thông tin giao hàng</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Form Fields */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Địa chỉ <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.address && (
                <div className="text-sm text-red-600">{errors.address}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Tên người nhận <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.name && (
                <div className="text-sm text-red-600">{errors.name}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Số điện thoại <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.phone && (
                <div className="text-sm text-red-600">{errors.phone}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Email <span className="text-red-600">*</span>:
              </label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.email && (
                <div className="text-sm text-red-600">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Ngày giao hàng <span className="text-red-600">*</span>:
              </label>
              <input
                type="date"
                name="selectedDate"
                value={shippingInfo.selectedDate}
                onChange={handleShippingInfoChange}
                min={formatDate(today)}
                max={formatDate(maxDate)}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.selectedDate && (
                <div className="text-sm text-red-600">
                  {errors.selectedDate}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Giờ giao hàng <span className="text-red-600">*</span>:
              </label>
              <input
                type="time"
                name="selectedTime"
                value={shippingInfo.selectedTime}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              />
              {errors.selectedTime && (
                <div className="text-sm text-red-600">
                  {errors.selectedTime}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Phương thức thanh toán <span className="text-red-600">*</span>:
              </label>
              <select
                name="paymentMethod"
                value={shippingInfo.paymentMethod}
                onChange={handleShippingInfoChange}
                className="rounded-lg border-2 p-3 focus:border-[#ffd040] focus:outline-none"
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="CreditCard">Thanh toán trực tuyến</option>
              </select>
              {errors.paymentMethod && (
                <div className="text-sm text-red-600">
                  {errors.paymentMethod}
                </div>
              )}
            </div>

            {/* Nút xác nhận */}
            <div className="mt-6 flex w-[100px] space-x-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full rounded-lg border bg-[#ffd040] py-2 text-white"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Shipping;
