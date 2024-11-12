// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Pointer } from "pointer-wallet"; 
// import axios from 'axios';
// import { useUser } from './UserContext'; // Import UserContext

// const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

// function Payment() {
//   const { id } = useParams();
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState(600);
//   const [shippingData, setShippingData] = useState(null);
//   const navigate = useNavigate();
//   const { user } = useUser(); // Lấy user từ UserContext
//   const userId = user.id;
//   const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchShippingData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3004/ship/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
  
//         // Sắp xếp theo thời gian tạo và lấy giao hàng mới nhất
//         const sortedShippingData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setShippingData(sortedShippingData[0]); // Lấy giao hàng mới nhất
//         console.log('Fetched latest shipping data:', sortedShippingData[0]); // Kiểm tra dữ liệu mới nhất
//       } catch (error) {
//         console.error('Error fetching shipping data:', error.response?.data || error.message);
//         navigate('/ship'); // Chuyển hướng nếu không tìm thấy dữ liệu shipping
//       }
//     };
  
//     fetchShippingData();
//   }, [userId, token, navigate]);
//   const handlePaymentChange = (event) => {
//     setSelectedPaymentMethod(event.target.value);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     if (timeRemaining > 0) {
//       const timer = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else {
//       navigate('/');
//     }
//   }, [timeRemaining, navigate]);

//   const processPayment = async (orderData) => {
//     try {
//       const { url } = await pointerPayment.createPayment({
//         amount: orderData.totalValue,
//         currency: "VND",
//         message: "Payment with Pointer",
//         userID: userId, // Sử dụng userId từ context
//         orderID: orderData.orderId,
//         returnUrl: `${VITE_REDIRECT_URL}`,
//         orders: orderData.orderItems || []
//       });

//       if (url) {
//         window.location.href = url; 
//       } else {
//         throw new Error('Lỗi khi tạo thanh toán.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const formatOrderData = (shippingData) => {
//     // Kiểm tra shippingData
//     if (!shippingData || !Array.isArray(shippingData) || shippingData.length === 0) {
//       throw new Error('Invalid shipping data or order items');
//     }
  
//     const selectedShippingInfo = shippingData[0]; // Chọn shippingInfo đầu tiên
  
//     // Kiểm tra orderItems
//     if (!selectedShippingInfo.orderItems || !Array.isArray(selectedShippingInfo.orderItems)) {
//       throw new Error('Invalid order items in shipping data');
//     }
  
//     const totalValue = selectedShippingInfo.orderItems.reduce((total, item) => {
//       const itemPrice = item.productId?.price || 0; // Giá mặc định là 0 nếu không có
//       return total + (itemPrice * item.quantity);
//     }, 0);
  
//     return {
//       orderId: `Order_${new Date().getTime()}`,
//       userId: selectedShippingInfo.userId,
//       totalValue,
//       orderItems: selectedShippingInfo.orderItems.map(item => ({
//         name: item.productId?.name || "Tên sản phẩm",
//         image: item.productId?.image || "URL của sản phẩm",
//         description: item.productId?.description || "Mô tả sản phẩm",
//         quantity: item.quantity,
//         price: item.productId?.price || 0,
//       })),
//       paymentMethod: selectedShippingInfo.paymentMethod,
//     };
//   };
  
//   const handlePaymentSubmit = async () => {
//     if (!selectedPaymentMethod) {
//       console.error('Payment method is not selected');
//       return;
//     }

//     if (!shippingData) {
//       console.error('Shipping data is null or undefined');
//       return;
//     }

//     try {
//       const orderData = formatOrderData(shippingData); // Định dạng dữ liệu đơn hàng
//       await processPayment(orderData);
//     } catch (error) {
//       console.error('Error during payment submission:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Chọn phương thức thanh toán</h2>
//       <input type="radio" id="pointer-wallet" name="payment" value="pointer-wallet" onChange={handlePaymentChange} />
//       <label htmlFor="pointer-wallet">Ví điện tử khác</label>
//       <p>Tổng giá tiền: {shippingData?.orderItems?.reduce((total, item) => total + (item.productId?.price * item.quantity), 0).toLocaleString()} VND</p>
//       <button onClick={handlePaymentSubmit} disabled={!selectedPaymentMethod}>
//         {selectedPaymentMethod === 'pointer-wallet' ? 'Thanh toán bằng ví điện tử' : 'Thanh toán'}
//       </button>
//     </div>
//   );
// }

// export default Payment;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pointer } from "pointer-wallet"; 
import axios from 'axios';
import { useUser } from './UserContext'; // Import UserContext

const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

function Payment() {
  const { id } = useParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [shippingData, setShippingData] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser(); // Lấy user từ UserContext
  const userId = user.id;
  const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/ship/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Kiểm tra nếu dữ liệu có sẵn và không bị lỗi
        if (!response.data || response.data.length === 0) {
          throw new Error('Không có thông tin giao hàng');
        }

        // Sắp xếp theo thời gian tạo và lấy giao hàng mới nhất
        const sortedShippingData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setShippingData(sortedShippingData[0]); // Lấy giao hàng mới nhất
        console.log('Fetched latest shipping data:', sortedShippingData[0]); // Kiểm tra dữ liệu mới nhất
      } catch (error) {
        console.error('Error fetching shipping data:', error.response?.data || error.message);
        navigate('/ship'); // Chuyển hướng nếu không tìm thấy dữ liệu shipping
      }
    };

    fetchShippingData();
  }, [userId, token, navigate]);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      navigate('/');
    }
  }, [timeRemaining, navigate]);

  const processPayment = async (orderData) => {
    try {
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalValue,
        currency: "VND",
        message: "Payment with Pointer",
        userID: userId, // Sử dụng userId từ context
        orderID: orderData.orderId,
        returnUrl: `${VITE_REDIRECT_URL}`,
        orders: orderData.orderItems || []
      });

      if (url) {
        window.location.href = url; 
      } else {
        throw new Error('Lỗi khi tạo thanh toán.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatOrderData = (shippingData) => {
    // Kiểm tra shippingData
    if (!shippingData || !shippingData.orderItems || shippingData.orderItems.length === 0) {
      throw new Error('Invalid shipping data or order items');
    }

    const selectedShippingInfo = shippingData; // Vì chỉ có một giao hàng mới nhất

    const totalValue = selectedShippingInfo.orderItems.reduce((total, item) => {
      const itemPrice = item.productId?.price || 0; // Giá mặc định là 0 nếu không có
      return total + (itemPrice * item.quantity);
    }, 0);

    return {
      orderId: `Order_${new Date().getTime()}`,
      userId: selectedShippingInfo.userId,
      totalValue,
      orderItems: selectedShippingInfo.orderItems.map(item => ({
        name: item.productId?.name || "Tên sản phẩm",
        image: item.productId?.imageUrl || "URL của sản phẩm",
        description: item.productId?.description || "Mô tả sản phẩm",
        quantity: item.quantity,
        price: item.productId?.price || 0,
      })),
      paymentMethod: selectedShippingInfo.paymentMethod,
    };
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      console.error('Payment method is not selected');
      return;
    }

    if (!shippingData) {
      console.error('Shipping data is null or undefined');
      return;
    }

    try {
      const orderData = formatOrderData(shippingData); // Định dạng dữ liệu đơn hàng
      await processPayment(orderData);
    } catch (error) {
      console.error('Error during payment submission:', error.message);
    }
  };

  return (
    <div>
      <h2>Chọn phương thức thanh toán</h2>
      <input type="radio" id="pointer-wallet" name="payment" value="pointer-wallet" onChange={handlePaymentChange} />
      <label htmlFor="pointer-wallet">Ví điện tử khác</label>
      <p>Tổng giá tiền: {shippingData?.orderItems?.reduce((total, item) => total + (item.productId?.price * item.quantity), 0).toLocaleString()} VND</p>
      <button onClick={handlePaymentSubmit} disabled={!selectedPaymentMethod}>
        {selectedPaymentMethod === 'pointer-wallet' ? 'Thanh toán bằng ví điện tử' : 'Thanh toán'}
      </button>
    </div>
  );
}

export default Payment;
