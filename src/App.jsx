import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import LikeList from "./LikeList";
import DetailProduct from "./detailProduct";
import ListProduct from "./ListProduct";
import ShoppingCart from "./Cart";
import Shipping from "./ship";
import Signup from "./signup";
import Kho from "./Admin/Kho";
import QlNhaCC from "./Admin/QlNhaCungCap";
import Ship2 from "./Admin/Ship";
import axios from "axios";
import CreateSupplierAndCategory from "./Admin/CreateSupplierAndCategory";
import CreateProduct from "./Admin/CreateProduct";
import CreatePromotion from "./Admin/CreatePromotion";
import SupplierList from "./Admin/listNCC";
import CategoryList from "./Admin/CategoryList";
import ProductList from "./Admin/ProductList";
import Header from "./header";
import CreateHangHoaAndCate from "./Admin/CreateHangHoaAndCate";
import { useUser } from "./UserContext";
import Payment from "./Payment";
import SupplierProducts from "./Admin/SupplierProducts";

function App() {
  const { userId, updateUserId } = useUser(); // Sử dụng UserContext
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Lấy token từ local storage

    if (token) {
      axios
        .get("http://localhost:3005/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        })
        .then((res) => {
          if (res.data.login) {
            setRole(res.data.role);
            setUsername(res.data.username); // Cập nhật tên người dùng
            updateUserId(res.data.userId);
          } else {
            console.log("Login failed or user not found");
          }
        })
        .catch((err) => {
          console.error("Error during verification:", err);
        });
    }
  }, [updateUserId]);

  return (
    <Router>
      <div>
        <Header username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setRoleVar={setRole} />} />
          <Route path="/likelist" element={<LikeList />} />
          <Route path="/Hang" element={<CreateHangHoaAndCate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/listProduct" element={<ListProduct />} />
          <Route path="/Cart" element={<ShoppingCart />} />
          <Route path="/ship" element={<Shipping />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kho" element={<Kho />} />
          <Route path="/Qlnhacc" element={<QlNhaCC />} />
          <Route path="/ship2" element={<Ship2 />} />
          <Route path="/Payment" element={<Payment />} />
          <Route
            path="/taonhacungcap"
            element={<CreateSupplierAndCategory />}
          />
          <Route path="/dsncc" element={<SupplierList />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/create-promotion" element={<CreatePromotion />} />
          <Route
            path="/supplier/:supplierId/categories"
            element={<CategoryList />}
          />
          <Route
            path="/category/:categoryId/products"
            element={<ProductList />}
          />
          <Route path="/supplier/:supplierId" element={<SupplierProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
