import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pointer } from "pointer-wallet";
import axios from "axios";
import { useUser } from "./UserContext";

const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [shippingData, setShippingData] = useState([]);
  const [userSignature, setUserSignature] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user.id;
  const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/ship/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const sortedShippingData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setShippingData(sortedShippingData[0]);
      } catch (error) {
        console.error(
          "Lỗi khi lấy dữ liệu giao hàng:",
          error.response?.data || error.message,
        );
        navigate("/ship");
      }
    };

    const fetchUserSignature = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3007/api/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUserSignature(userResponse.data.signature);
      } catch (error) {
        console.error(
          "Lỗi khi lấy chữ ký người dùng:",
          error.response?.data || error.message,
        );
      }
    };

    fetchShippingData();
    fetchUserSignature();
  }, [userId, token, navigate]);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const formatOrderData = (shippingData) => {
    if (
      !shippingData ||
      !shippingData.orderItems ||
      shippingData.orderItems.length === 0
    ) {
      throw new Error("Dữ liệu giao hàng hoặc mặt hàng đơn hàng không hợp lệ");
    }

    const totalValue = shippingData.orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return {
      orderId: shippingData._id,
      userId: shippingData.userId,
      totalValue,
      orderItems: shippingData.orderItems.map((item) => ({
        name: item.name || "Tên sản phẩm",
        image: item.imageUrl || "URL hình ảnh sản phẩm",
        description: item.description || "Mô tả sản phẩm",
        quantity: item.quantity,
        price: item.price || 0,
      })),
      paymentMethod: shippingData.paymentMethod,
    };
  };

  const processQuickPayment = async (orderData) => {
    console.log({
      signature: userSignature,
      amount: orderData.totalValue,
      currency: "VND",
      message: `Thanh toán cho đơn hàng #${orderData.orderId}`,
      userID: userId,
      orderID: orderData.orderId,
      returnUrl: VITE_REDIRECT_URL,
    });
    try {
      await axios.post(
        `https://api.pointer.io.vn/api/payment/connect-wallet/payment`,
        {
          signature: userSignature,
          amount: orderData.totalValue,
          currency: "VND",
          message: `Thanh toán cho đơn hàng #${orderData.orderId}`,
          userID: userId,
          orderID: orderData.orderId,
          returnUrl: VITE_REDIRECT_URL,
        },
        {
          headers: {
            Authorization: `Bearer sk_pointerf97ad5e90eb156b9a2b5d18e44bb37f8c89c2f0db611038a751c3bc7e0ec63c6`,
          },
          withCredentials: false,
        },
      );
      alert("Thanh toán nhanh thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán nhanh:", error);
    }
  };

  const processQRCodePayment = async (orderData) => {
    try {
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalValue,
        currency: "VND",
        message: `Thanh toán với Pointer cho đơn hàng #${orderData.orderId}`,
        userID: userId,
        orderID: orderData.orderId,
        returnUrl: VITE_REDIRECT_URL,
        orders: orderData.orderItems,
      });

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Lỗi khi tạo mã QR thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán qua mã QR:", error);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      console.error("Phương thức thanh toán chưa được chọn");
      return;
    }

    if (!shippingData) {
      console.error("Dữ liệu giao hàng không hợp lệ");
      return;
    }

    try {
      const orderData = formatOrderData(shippingData);
      if (selectedPaymentMethod === "quick-payment") {
        await processQuickPayment(orderData);
      } else if (selectedPaymentMethod === "qr-payment") {
        await processQRCodePayment(orderData);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu thanh toán:", error.message);
    }
  };

  return (
    <div>
      <h2>Chọn phương thức thanh toán</h2>
      <div>
        <input
          type="radio"
          id="quick-payment"
          name="payment"
          value="quick-payment"
          onChange={handlePaymentChange}
        />
        <label htmlFor="quick-payment">Thanh toán nhanh</label>
      </div>
      <div>
        <input
          type="radio"
          id="qr-payment"
          name="payment"
          value="qr-payment"
          onChange={handlePaymentChange}
        />
        <label htmlFor="qr-payment">Quét mã QR</label>
      </div>
      <p>
        Tổng giá:{" "}
        {shippingData?.orderItems
          ?.reduce((total, item) => total + item.price * item.quantity, 0)
          .toLocaleString()}{" "}
        VND
      </p>
      <button onClick={handlePaymentSubmit} disabled={!selectedPaymentMethod}>
        {selectedPaymentMethod === "quick-payment"
          ? "Thanh toán nhanh"
          : "Quét mã QR"}
      </button>
    </div>
  );
}

export default Payment;
