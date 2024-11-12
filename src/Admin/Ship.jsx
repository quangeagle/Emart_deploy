import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ship2 = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3004/ship/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });

    getInvoices();
  }, []);

  const getInvoices = () => {
    axios.get('http://localhost:3004/invoice/')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
  };

  const handleCreateInvoice = (orderId) => {
    axios.post('http://localhost:3004/invoice/create', { orderId })
      .then(response => {
        if (response.data && response.data.invoice) {
          console.log('Invoice created successfully');
          getInvoices(); // Cập nhật danh sách hóa đơn sau khi tạo mới
        } else {
          console.error('Invalid invoice data received');
        }
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
      });
  };

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày lập</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.name}</td>
              <td>{order.orderItems.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)}₫</td>
              <td>
                <button
                  onClick={() => handleCreateInvoice(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Xuất hóa đơn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Danh sách hóa đơn</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th>ID Khách hàng</th>
            <th>Mã đơn hàng</th>
            <th>Ngày</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map(invoice => (
              Array.isArray(invoice.items) && invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <tr key={`${invoice._id}-${item.productId}-${index}`}>
                    <td>{invoice.customerId ? invoice.customerId._id : 'N/A'}</td>
                    <td>{invoice.orderId ? invoice.orderId._id : 'N/A'}</td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}₫</td>
                    <td>{invoice.totalAmount}₫</td>
                  </tr>
                ))
              ) : (
                <tr key={`no-items-${invoice._id}`}>
                  <td colSpan="7">No items available</td>
                </tr>
              )
            ))
          ) : (
            <tr>
              <td colSpan="7">No invoices available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ship2;
