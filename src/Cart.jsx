import React, { useState, useEffect } from "react";
import Footer from "./footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser(); // Lấy user từ UserContext
  const userId = user.id;

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:3005/cart/${userId}`)
      .then((response) => {
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const updateQuantity = (versionId, newQuantity, productId) => {
    if (newQuantity < 0) return;

    axios
      .post("http://localhost:3005/cart/update", {
        userId,
        productId,
        versionId,
        quantity: newQuantity,
      })
      .then((response) => {
        fetchCartItems(); // Refetch the updated cart items
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const removeItem = (versionId, productId) => {
    console.log("Requesting to remove item with versionId:", versionId);
    axios
      .post("http://localhost:3005/cart/xoa", { userId, productId, versionId })
      .then((response) => {
        console.log("Item removed successfully:", response.data);
        setCartItems(response.data.cartItems); // Assuming the response contains updated cart items
        window.location.reload(); // Reload the page after updating cart items
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.versionPrice || 0) * item.quantity,
      0,
    );
  };

  return (
    <>
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center rounded-t-md bg-yellow-400 px-6 py-4">
          <img src="cart-icon-1.png" className="h-12 w-12" alt="Cart Icon" />
          <h2 className="ml-4 text-2xl font-semibold text-white">Giỏ Hàng</h2>
        </div>

        <div className="mt-6 rounded-b-md bg-white p-6 shadow-lg">
          <div className="mb-4 mt-[-30px] flex items-center border-b pb-4">
            <input type="checkbox" className="mr-2 h-4 w-4" />
            <span className="text-lg text-gray-700">
              Bạn đang chọn giao hàng từ Emart Phan Van Tri
            </span>
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4"
              >
                <img
                  src={item.versionImage}
                  alt="Product"
                  className="h-24 w-24 rounded-md object-cover"
                />
                <div className="flex-grow px-6">
                  <h3 className="text-lg font-medium">{item.versionName}</h3>
                  <p className="text-sm text-gray-500">{item.versionPrice}₫</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.versionId,
                        item.quantity - 1,
                        item.productId,
                      )
                    }
                    className="mr-2 rounded-md bg-gray-200 px-[10px] py-1 text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.versionId,
                        item.quantity + 1,
                        item.productId,
                      )
                    }
                    className="ml-2 rounded-md bg-gray-200 px-2 py-1 text-gray-700"
                  >
                    +
                  </button>
                </div>
                <div className="ml-4 text-lg font-semibold text-red-500">
                  {item.quantity * item.versionPrice}₫
                </div>
                <button
                  onClick={() => removeItem(item.versionId, item.productId)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500">
              Giỏ hàng của bạn đang trống.
            </p>
          )}

          <div className="mt-6 flex justify-between border-t pt-4">
            <div>
              <h4 className="text-lg font-semibold">Giá trị đơn hàng</h4>
              <p className="text-lg text-gray-700">{calculateTotal()}₫</p>
            </div>
            <div className="text-right">
              <h4 className="text-lg font-semibold">Tổng tiền hàng</h4>
              <p className="text-lg text-red-500">{calculateTotal()}₫</p>
            </div>
          </div>

          <Link to="/ship">
            <button
              disabled={cartItems.length === 0} // Disable button if cart is empty
              className={`mt-6 w-full rounded-md py-3 text-lg font-semibold ${
                cartItems.length === 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-yellow-400 hover:bg-yellow-500"
              } text-white`}
            >
              Thanh Toán
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
