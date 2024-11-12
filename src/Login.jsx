


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import dotenv from 'dotenv';  
const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleTraditionalLogin = () => {
      axios.post('http://localhost:3005/auth/login', { username, password })
        .then(res => {
          if (res.data.login) {
            updateUserInfo(res.data.userId , res.data.username ); // Update with user ID
            console.log("User ID in Login:", res.data.userId);
            navigate('/'); // Redirect all users to home page after successful login
          } else {
            console.log("Đăng nhập không thành công");
            setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra tài khoản và mật khẩu.'); // Display error message
          }
        })
        .catch(err => {
          console.log(err);
          setErrorMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.'); // Show error message for failed login
        });
    };
    

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Không có token xác thực');
        }

        const response = await axios.get('http://localhost:3005/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.login) { // Sửa để kiểm tra đúng trường `login`
          updateUserInfo(response.data.userId, response.data.username); // Cập nhật username
          console.log('Trạng thái xác thực:', response.data);
          navigate('/'); // Chuyển hướng đến trang chính
        }
      } catch (error) {
        console.error('Lỗi xác minh đăng nhập:', error.response ? error.response.data : error.message);
        setErrorMessage('Lỗi xác minh đăng nhập. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate, updateUserInfo]);
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3005/auth/callback?code=${code}`, { withCredentials: true });
          
          // Log toàn bộ nội dung phản hồi để kiểm tra
          console.log('Nội dung phản hồi:', response.data);
          
          const { token, userId, username } = response.data; // Đảm bảo rằng bạn đang lấy đúng trường từ phản hồi
          console.log('ID người dùng:', userId);
          console.log('Tên người dùng:', username);
      
          if (token) {
            localStorage.setItem('authToken', token);
            handleLogin({ id: userId, name: username }); // Cập nhật với userId và username
            navigate('/');
          } else {
            console.error('Không thể lấy token. Vui lòng thử lại.');
            setErrorMessage('Không thể lấy token. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Lỗi trong quá trình callback: ' + error.message);
          setErrorMessage('Lỗi trong quá trình callback. Vui lòng thử lại.');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Không có mã trong URL callback');
        setErrorMessage('Không có mã trong URL callback.');
      }
    };

    handleCallback();
  }, [navigate]);

  const handleLogin = (userData) => {
    console.log('Thực hiện đăng nhập:', userData); // Log thông tin đăng nhập
    updateUserInfo(userData.id, userData.name); // Cập nhật cả userId và username
  };

  const handleLoginRedirect = () => {
    window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=67337fc3e5a4d9ac27ff2c0e`;
  };
  
  return (
   
       <div className="login">
          <h3 className="h3_dangnhap">ĐĂNG NHẬP</h3>

          {/* Traditional Login Form */}
          <input
            type="text"
            placeholder="Tên đăng nhập / Số điện thoại"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <input 
            type="password" 
            placeholder="Mật khẩu" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <br />

          <button onClick={handleTraditionalLogin}>ĐĂNG NHẬP TRUYỀN THỐNG</button>

      <h3>ĐĂNG NHẬP QUA SSO</h3>
      <button onClick={handleLoginRedirect}>Đăng nhập qua SSO Pointer</button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
    </div>
  );
};

export default Login;
