
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Pointer } from "pointer-wallet"; 
// import axios from 'axios';
// import { useUser } from './UserContext';

// const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

// function Payment() {

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState(600);
//   const [shippingData, setShippingData] = useState([]);
//   const navigate = useNavigate();
//   const { user } = useUser();
//   const userId = user.id;
//   const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchShippingData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/ship/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        

//         if (!response.data || response.data.length === 0) {
//           throw new Error('No shipping data available');
//         }

//         const sortedShippingData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setShippingData(sortedShippingData[0]);
//         console.log('Fetched latest shipping data:', sortedShippingData[0]);
//         console.log('Fetched latest cc shipping data:', shippingData);
//       } catch (error) {
//         console.error('Error fetching shipping data:', error.response?.data || error.message);
//         navigate('/ship');
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
//         userID: userId,
//         orderID: orderData.orderId,
//         returnUrl: `${VITE_REDIRECT_URL}`,
//         orders: orderData.orderItems || []
//       });

//       if (url) {
//         window.location.href = url; 
//       } else {
//         throw new Error('Error creating payment.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const formatOrderData = (shippingData) => {
//     if (!shippingData || !shippingData.orderItems || shippingData.orderItems.length === 0) {
//       throw new Error('Invalid shipping data or order items');
//     }

//     const totalValue = shippingData.orderItems.reduce((total, item) => {
//       const itemPrice = item.
//     price || 0; // Use `productVersionId` if available
//       return total + (itemPrice * item.
//        quantity);
//     }, 0);

//     return {
//       orderId: shippingData._id,
//       userId: shippingData.userId,
//       totalValue,
//       orderItems: shippingData.orderItems.map(item => ({
//         name: item.
//         name || "Product Name",
//         image: item.
//       imageUrl || "Product Image URL",
//         description: item.
//       description || "Product Description",
//         quantity: item.
//       quantity,
//         price: item.
//         price || 0,
//       })),
//       paymentMethod: shippingData.paymentMethod,
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
//       const orderData = formatOrderData(shippingData);
//       await processPayment(orderData);
//     } catch (error) {
//       console.error('Error during payment submission:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Choose Payment Method</h2>
//       <input type="radio" id="pointer-wallet" name="payment" value="pointer-wallet" onChange={handlePaymentChange} />
//       <label htmlFor="pointer-wallet">thanh toán với PressPay</label>
//       <p>Total Price: {shippingData?.orderItems?.reduce((total, item) => total + (item.
// price * item.
// quantity), 0).toLocaleString()} VND</p>
//       <button onClick={handlePaymentSubmit} disabled={!selectedPaymentMethod}>
//         {selectedPaymentMethod === 'pointer-wallet' ? 'Pay with Wallet PressPay' : 'Pay'}
//       </button>
//     </div>
//   );
// }

// export default Payment;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pointer } from "pointer-wallet"; 
import axios from 'axios';
import { useUser } from './UserContext';

const VITE_REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [shippingData, setShippingData] = useState([]);
  const [userSignature, setUserSignature] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user.id;
  const pointerPayment = new Pointer(import.meta.env.VITE_POINTER_SECRET_KEY);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/ship/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sortedShippingData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setShippingData(sortedShippingData[0]);
      } catch (error) {
        console.error('Error fetching shipping data:', error.response?.data || error.message);
        navigate('/ship');
      }
    };

    const fetchUserSignature = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3007/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
       
        setUserSignature(userResponse.data.signature);
      } catch (error) {
        console.error('Error fetching user signature:', error.response?.data || error.message);
      }
    };

    fetchShippingData();
    fetchUserSignature();
  }, [userId, token, navigate]);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const formatOrderData = (shippingData) => {
    if (!shippingData || !shippingData.orderItems || shippingData.orderItems.length === 0) {
      throw new Error('Invalid shipping data or order items');
    }

    const totalValue = shippingData.orderItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    return {
      orderId: shippingData._id,
      userId: shippingData.userId,
      totalValue,
      orderItems: shippingData.orderItems.map(item => ({
        name: item.name || "Product Name",
        image: item.imageUrl || "Product Image URL",
        description: item.description || "Product Description",
        quantity: item.quantity,
        price: item.price || 0,
      })),
      paymentMethod: shippingData.paymentMethod,
    };
  };

  const processQuickPayment = async (orderData) => {
    console.log(
      {
        signature: userSignature,
        amount: orderData.totalValue,
        currency: "VND",
        message: `Payment for order #${orderData.orderId}`,
        userID: userId,
        orderID: orderData.orderId,
        returnUrl: VITE_REDIRECT_URL,
      }
    )
    try {
      await axios.post(`https://api.pointer.io.vn/api/payment/connect-wallet/payment`,{
        signature: userSignature,
        amount: orderData.totalValue,
        currency: "VND",
        message: `Payment for order #${orderData.orderId}`,
        userID: userId,
        orderID: orderData.orderId,
        returnUrl: VITE_REDIRECT_URL,
      } ,{
        headers: { Authorization: `Bearer sk_pointerf97ad5e90eb156b9a2b5d18e44bb37f8c89c2f0db611038a751c3bc7e0ec63c6` },
        withCredentials :false
      }
      
    );({
        signature: userSignature,
        amount: orderData.totalValue,
        currency: "VND",
        message: `Payment for order #${orderData.orderId}`,
        userID: userId,
        orderID: orderData.orderId,
        returnUrl: VITE_REDIRECT_URL,
      });
      alert('Thanh toán nhanh thành công!');
      navigate('/');
    } catch (error) {
      console.error('Error during quick payment:', error);
      console.log(error)
    }
  };

  const processQRCodePayment = async (orderData) => {
    try {
      const { url } = await pointerPayment.createPayment({
        amount: orderData.totalValue,
        currency: "VND",
        message: `Payment with Pointer for order #${orderData.orderId}`,
        userID: userId,
        orderID: orderData.orderId,
        returnUrl: VITE_REDIRECT_URL,
        orders: orderData.orderItems,
      });

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Error creating QR code payment.');
      }
    } catch (error) {
      console.error('Error during QR code payment:', error);
    }
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
      const orderData = formatOrderData(shippingData);
      if (selectedPaymentMethod === 'quick-payment') {
        await processQuickPayment(orderData);
      } else if (selectedPaymentMethod === 'qr-payment') {
        await processQRCodePayment(orderData);
      }
    } catch (error) {
      console.error('Error during payment submission:', error.message);
    }
  };

  return (
    <div>
      <h2>Choose Payment Method</h2>
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
        {shippingData?.orderItems?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ).toLocaleString()}{" "}
        VND
      </p>
      <button onClick={handlePaymentSubmit} disabled={!selectedPaymentMethod}>
        {selectedPaymentMethod === 'quick-payment'
          ? 'Thanh toán nhanh'
          : 'Quét mã QR'}
      </button>
    </div>
  );
}

export default Payment;
