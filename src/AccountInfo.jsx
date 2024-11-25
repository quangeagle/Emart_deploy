// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from './UserContext';

// function AccountInfo() {
//     const { user } = useUser();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (user.id) {
//             setLoading(true); // Bắt đầu tải dữ liệu
//             setError(null); // Xóa lỗi trước đó
//             axios.get(`http://localhost:3005/ship/${user.id}`)
//                 .then(response => {
//                     // Giả sử orders nằm trong response.data.orders
//                     setOrders(response.data); // Điều chỉnh theo phản hồi API của bạn
//                     setLoading(false); // Đặt loading thành false khi dữ liệu đã được tải xong
//                 })
//                 .catch(error => {
//                     console.error('Lỗi khi lấy đơn hàng:', error);
//                     setError('Lỗi khi lấy đơn hàng'); // Đặt thông báo lỗi
//                     setLoading(false); // Đặt loading thành false khi có lỗi
//                 });
//         }
//     }, [user]);

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-4">Thông Tin Tài Khoản</h2>
//             <div className="mb-6">
//                 <h3 className="text-xl font-semibold">Lịch Sử Mua Hàng</h3>
//                 {loading ? (
//                     <p>Đang tải dữ liệu...</p> // Hiển thị trạng thái đang tải
//                 ) : error ? (
//                     <p className="text-red-500">{error}</p> // Hiển thị thông báo lỗi nếu có lỗi
//                 ) : orders.length > 0 ? (
//                     <table className="w-full border-collapse border mt-4">
//                         <thead>
//                             <tr>
//                                 <th className="border p-2">Mã Đơn Hàng</th>
//                                 <th className="border p-2">Ngày Mua</th>
//                                 <th className="border p-2">Tổng Tiền</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <tr key={order._id}>
//                                     <td className="border p-2">{order._id}</td>
//                                     <td className="border p-2">
//                                         {new Date(order.selectedDate).toLocaleDateString()}
//                                     </td>
//                                     <td className="border p-2">
//                                         {order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)} VND
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="mt-4">Bạn chưa có đơn hàng nào.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AccountInfo;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

function AccountInfo() {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user.id) {
            setLoading(true); // Bắt đầu tải dữ liệu
            setError(null); // Xóa lỗi trước đó
            axios.get(`http://localhost:3005/ship/${user.id}`)
                .then(response => {
                    setOrders(response.data); // Giả sử orders nằm trong response.data
                    setLoading(false); // Đặt loading thành false khi dữ liệu đã được tải xong
                })
                .catch(error => {
                    console.error('Lỗi khi lấy đơn hàng:', error);
                    setError('Lỗi khi lấy đơn hàng'); // Đặt thông báo lỗi
                    setLoading(false); // Đặt loading thành false khi có lỗi
                });
        }
    }, [user]);

    const handleCancelOrder = (orderId) => {
        // Xử lý hủy đơn hàng
        axios.put(`http://localhost:3007/ship/cancel`
            , {
                orderId,
               }  
        )
            .then(response => {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                alert('Đơn hàng đã được hủy!');
            })
            .catch(error => {
                console.error('Lỗi khi hủy đơn hàng:', error);
                alert('Không thể hủy đơn hàng!');
            });
    };

    const handleRefundOrder =  async (orderID) => {
        try {// Xử lý hoàn tiền cho đơn hàng
        const response = await fetch('http://localhost:3007/ship/refund', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer sk_pointerf97ad5e90eb156b9a2b5d18e44bb37f8c89c2f0db611038a751c3bc7e0ec63c6',
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ orderID }),
          });
    
          
    
          const data = await response.json();
          console.log('Order refunded successfully:', data);
    
          alert('Hoàn tiền thành công');
          location.reload();
        } catch (error) {
          console.error('Error refunding order:', error.message);
         
        }
      };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Thông Tin Tài Khoản</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Lịch Sử Mua Hàng</h3>
                {loading ? (
                    <p>Đang tải dữ liệu...</p> // Hiển thị trạng thái đang tải
                ) : error ? (
                    <p className="text-red-500">{error}</p> // Hiển thị thông báo lỗi nếu có lỗi
                ) : orders.length > 0 ? (
                    <table className="w-full border-collapse border mt-4">
                        <thead>
                            <tr>
                                <th className="border p-2">Mã Đơn Hàng</th>
                                <th className="border p-2">Ngày Mua</th>
                                <th className="border p-2">Sản Phẩm</th>
                                <th className="border p-2">Số Lượng</th>
                                <th className="border p-2">Giá 1 Sản Phẩm</th>
                                <th className="border p-2">Tổng Tiền</th>
                                <th className="border p-2">Trạng Thái</th>
                                <th className="border p-2">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="border p-2">{order._id}</td>
                                    <td className="border p-2">
                                        {new Date(order.selectedDate).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2">
                                        {order.orderItems.map((item) => (
                                            <div key={item._id}>
                                                <p>{item.name}</p>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border p-2">
                                        {order.orderItems.map((item) => (
                                            <div key={item._id}>
                                                {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border p-2">
                                        {order.orderItems.map((item) => (
                                            <div key={item._id}>
                                                {item.price} VND
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border p-2">
                                        {order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)} VND
                                    </td>
                                    <td className="border p-2">{order.status}</td>
                                    <td className="border p-2">
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Hủy
                                            </button>
                                        )}
                                        {order.status === 'paid' && (
                                            <button
                                                onClick={() => handleRefundOrder(order._id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Hoàn Tiền
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-4">Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
}

export default AccountInfo;
