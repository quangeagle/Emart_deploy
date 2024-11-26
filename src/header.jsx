import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch, faCartShopping, faHeart, faUser, faSignOutAlt, faBell, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import cc from '../src/Image/emart.png';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  // State for search query
  const { user, updateUserInfo } = useUser();
  const navigate = useNavigate();

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3005/auth/logout")
      .then(() => {
        updateUserInfo(null, ""); // Reset user info
        localStorage.removeItem("authToken");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const handleAccountInfo = () => {
    navigate('/account-info');
  };

  const handleAccountInfo2 = () => {
    navigate('/connect');
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/product-detail/${searchQuery}`);  // Navigate to the product detail page with the search query
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user.email) {
      axios.get('http://localhost:3005/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          if (response.data.login) {
            updateUserInfo(response.data.userId, response.data.email);
          }
        })
        .catch(error => console.error('Login verification error:', error));
    }
  }, [user, updateUserInfo]);

  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center text-white text-sm px-10 py-2">
        <div className="flex space-x-4">
          <Link to="/seller" className="hover:underline">Kênh Người Bán</Link>
          <Link to="/become-seller" className="hover:underline">Trở thành Người bán Shopee</Link>
          <Link to="/download" className="hover:underline">Tải ứng dụng</Link>
          <div className="flex space-x-2">
            <span>Kết nối</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faUser} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/notifications" className="hover:underline"><FontAwesomeIcon icon={faBell} /> Thông Báo</Link>
          <Link to="/support" className="hover:underline"><FontAwesomeIcon icon={faQuestionCircle} /> Hỗ Trợ</Link>
          <div className="relative">
            <button className="hover:underline flex items-center">
              Tiếng Việt
            </button>
          </div>
          {user.email ? (
            <div className="relative cursor-pointer" onClick={handleUserDropdownToggle}>
              <div className="flex items-center">
                <p>Xin chào, {user.email}</p>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </div>
              {isUserDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded w-32 mt-2 right-0 z-50">
                  <div
                    className="text-black text-xs px-3 py-2 cursor-pointer hover:bg-slate-600 hover:text-white"
                    onClick={handleAccountInfo}
                  >
                    <FontAwesomeIcon icon={faUser} /> Thông tin tài khoản
                  </div>
                  <div
                    className="text-black text-xs px-3 py-2 cursor-pointer hover:bg-slate-600 hover:text-white"
                    onClick={handleAccountInfo2}
                  >
                    <FontAwesomeIcon icon={faUser} /> kết nối
                  </div>
                  <div
                    className="text-black text-xs px-3 py-2 cursor-pointer hover:bg-slate-600 hover:text-white"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to='/register' className="hover:underline">Đăng Ký</Link>
              <Link to='/login' className="hover:underline">Đăng Nhập</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-center py-4">
        <Link to="/">
          <img src={cc} alt="Logo" className="h-10 w-36" />
        </Link>

        <div className="relative ml-8 flex w-[700px] items-center">
          <input
            className="h-10 w-full rounded-full bg-white pl-4 pr-12 text-sm placeholder-gray-500"
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-orange-500"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} className="text-sm text-white" />
          </div>
        </div>

        <div className="ml-8 flex space-x-4 text-sm text-white">
          <Link to="/cart" className="flex cursor-pointer flex-col items-center">
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <p>Giỏ Hàng</p>
          </Link>
          <Link to="/likelist" className="flex cursor-pointer flex-col items-center">
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
            <p>Yêu Thích</p>
          </Link>
        </div>
      </div>

      <div className="flex justify-center space-x-8 bg-orange-500 py-2 text-xs text-white">
        <Link to="/product1" className="hover:underline">Bình Nước Cho Nam</Link>
        <Link to="/sale-phone" className="hover:underline">Săn Sale 1k Điện Thoại</Link>
        <Link to="/hot-trend-shirts" className="hover:underline">Áo Phông Hot Trend 2024</Link>
        <Link to="/lipstick" className="hover:underline">Son Bóng Chính Hãng</Link>
        <Link to="/desk-decor" className="hover:underline">Decor Bàn Học Giá Rẻ</Link>
      </div>
    </header>
  );
}

export default Header;
