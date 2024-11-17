


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useUser } from './UserContext';
// import dotenv from 'dotenv';  
// const Login = () => {
//   const navigate = useNavigate();
//   const { updateUserInfo } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const [email, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//     const handleTraditionalLogin = () => {
//       axios.post('http://localhost:3005/auth/login', { email, password })
//         .then(res => {
//           if (res.data.login) {
//             updateUserInfo(res.data.userId , res.data.email ); // Update with user ID
//             console.log("User ID in Login:", res.data.userId);
//             navigate('/'); // Redirect all users to home page after successful login
//           } else {
//             console.log("Đăng nhập không thành công");
//             setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra tài khoản và mật khẩu.'); // Display error message
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           setErrorMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.'); // Show error message for failed login
//         });
//     };
    

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           throw new Error('Không có token xác thực');
//         }

//         axios.get('http://localhost:3005/auth/verify', { headers: { 'Authorization': `Bearer ${token}` } })
//         .then(response => {
//             console.log('User verified:', response.data);
//         })
//         .catch(error => {
//             console.error('Error verifying user:', error.response ? error.response.data : error.message);
//         });

//         if (response.data.login) { // Sửa để kiểm tra đúng trường `login`
//           updateUserInfo(response.data.userId, response.data.email); // Cập nhật username
//           console.log('Trạng thái xác thực:', response.data);
//           navigate('/'); // Chuyển hướng đến trang chính
//         }
//       } catch (error) {
//         console.error('Lỗi xác minh đăng nhập:', error.response ? error.response.data : error.message);
//         setErrorMessage('Lỗi xác minh đăng nhập. Vui lòng thử lại.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoginStatus();
//   }, [navigate, updateUserInfo]);
//   useEffect(() => {
//     const handleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');
//       if (code) {
//         setLoading(true);
//         try {
//           const response = await axios.get(`http://localhost:3005/auth/callback?code=${code}`, { withCredentials: true });
          
//           // Log toàn bộ nội dung phản hồi để kiểm tra
//           console.log('Nội dung phản hồi:', response.data);
          
//           const { token, userId, email } = response.data; // Đảm bảo rằng bạn đang lấy đúng trường từ phản hồi
//           console.log('ID người dùng:', userId);
//           console.log('Tên người dùng:', email);
      
//           if (token) {
//             localStorage.setItem('authToken', token);
//             handleLogin({ id: userId, email: email }); // Cập nhật với userId và username
//             navigate('/');
//           } else {
//             console.error('Không thể lấy token. Vui lòng thử lại.');
//             setErrorMessage('Không thể lấy token. Vui lòng thử lại.');
//           }
//         } catch (error) {
//           console.error('Lỗi trong quá trình callback: ' + error.message);
//           setErrorMessage('Lỗi trong quá trình callback. Vui lòng thử lại.');
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         console.error('Không có mã trong URL callback');
//         setErrorMessage('Không có mã trong URL callback.');
//       }
//     };

//     handleCallback();
//   }, [navigate]);

//   const handleLogin = (userData) => {
//     console.log('Thực hiện đăng nhập:', userData); // Log thông tin đăng nhập
//     updateUserInfo(userData.id, userData.name); // Cập nhật cả userId và username
//   };

//   const handleLoginRedirect = () => {
//     window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=6736198ea2e9285438e3da56`;
//   };
  
//   return (
   
//        <div className="login">
//           <h3 className="h3_dangnhap">ĐĂNG NHẬP</h3>

//           {/* Traditional Login Form */}
//           <input
//             type="text"
//             placeholder="Tên đăng nhập / Số điện thoại"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <br />

//           <input 
//             type="password" 
//             placeholder="Mật khẩu" 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//           <br />

//           <button onClick={handleTraditionalLogin}>ĐĂNG NHẬP TRUYỀN THỐNG</button>

//       <h3>ĐĂNG NHẬP QUA SSO</h3>
//       <button onClick={handleLoginRedirect}>Đăng nhập qua SSO Pointer</button>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
//     </div>
//   );
// };

// export default Login;








import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import { Input, Button, Typography, Spin, message } from 'antd';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleTraditionalLogin = () => {
    axios.post('http://localhost:3005/auth/login', { email, password })
      .then(res => {
        if (res.data.login) {
          updateUserInfo(res.data.userId, res.data.email);
          console.log("User ID in Login:", res.data.userId);
          navigate('/');
        } else {
          setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra tài khoản và mật khẩu.');
        }
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.login) {
          updateUserInfo(response.data.userId, response.data.email);
          navigate('/');
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
          const { token, userId, email } = response.data;

          if (token) {
            localStorage.setItem('authToken', token);
            handleLogin({ id: userId, email });
            navigate('/');
          } else {
            setErrorMessage('Không thể lấy token. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Lỗi trong quá trình callback: ' + error.message);
          setErrorMessage('Lỗi trong quá trình callback. Vui lòng thử lại.');
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage('Không có mã trong URL callback.');
      }
    };

    handleCallback();
  }, [navigate]);

  const handleLogin = (userData) => {
    updateUserInfo(userData.id, userData.email);
  };

  const handleLoginRedirect = () => {
    window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=6736198ea2e9285438e3da56`;
  };

  return (
    <div className='mt-10' style={{ maxWidth: 400, margin: 'auto',marginTop:'50px', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Title level={3}>ĐĂNG NHẬP</Title>

      {/* Traditional Login Form */}
      <Input
        placeholder="Tên đăng nhập / Số điện thoại"
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Input.Password
        placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button type="primary" block onClick={handleTraditionalLogin} loading={loading}>
        ĐĂNG NHẬP TRUYỀN THỐNG
      </Button>

      <Title level={3} style={{ marginTop: '2rem' }}>ĐĂNG NHẬP QUA SSO</Title>
      <Button type="default" block onClick={handleLoginRedirect}>
        Đăng nhập qua SSO Pointer
      </Button>
  

      {errorMessage && <Text type="danger" style={{ marginTop: '1rem', display: 'block' }}>{errorMessage}</Text>}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Spin tip="Đang xử lý..." />
        </div>
      )}
    </div>
  );
};

export default Login;
