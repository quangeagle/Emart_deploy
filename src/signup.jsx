// import React, { useState } from "react";

// import Footer from './footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState(''); // Thêm trường email
//   const [password, setPassword] = useState('');
//   const [dob, setDob] = useState('');
//   const [phone, setPhone] = useState('');
//   const [gender, setGender] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3004/user/register', {
//       username, name, email, password, dob, gender,phone
//     })
//       .then(res => {
//         if (res.data.success) {
//           navigate('/login');
//         } else {
//           alert(res.data.message);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Đăng ký thất bại. Vui lòng thử lại.');
//       });
//   };

//   return (
//     <>
//       <div className="bg-slate-100">
     
//         <div className=" mt-5 ml-12 mr-12">
//           <p className="ml-2 bg-gray-400 pl-3 pt-3 mt-3">THÔNG TIN VẬN CHUYỂN</p>
//           <div className="flex flex-row ">
//             <div className="w-3/5 bg-white pr-4">
//               <div className="ml-4 bg-white">
//                 <div className="container ">
//                   <div className="mb-4">
//                     <form className="student-form" onSubmit={handleSubmit}>
//                       <label className=" text-gray-700 mb-2">Tên</label>
//                       <input
//                         type="text"
//                         className="border border-gray-300 p-2 rounded w-full"
//                         placeholder="Nhập tên"
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                       <label className="  text-gray-700 mb-2">Tên đăng nhập</label>
//                       <input
//                         type="text"
//                         className="border border-gray-300 p-2 rounded w-full mb-4"
//                         placeholder="Nhập tên đăng nhập"
//                         onChange={(e) => setUsername(e.target.value)}
//                       />

// <label className="  text-gray-700 mb-2">Số điện thoại   </label>
//                       <input
//                         type="text"
//                         className="border border-gray-300 p-2 rounded w-full mb-4"
//                         placeholder="Nhập tên đăng nhập"
//                         onChange={(e) => setPhone(e.target.value)}
//                       />
//                       <label className="  text-gray-700 mb-2">Email</label>
//                       <input
//                         type="email"
//                         className="border border-gray-300 p-2 rounded w-full mb-4"
//                         placeholder="Nhập email"
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                       <label className=" text-gray-700 mb-2">Mật khẩu</label>
//                       <input
//                         type="password"
//                         className=" border-gray-300 p-2 rounded w-full mb-4"
//                         placeholder="Nhập mật khẩu"
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
                    
//                       <div className="flex items-center">
//                         <div className="w-1/2 pr-2">
//                           <label className=" text-gray-700 mb-2">Ngày sinh</label>
//                           <input
//                             type="date"
//                             className="border border-gray-300 p-2 rounded w-full"
//                             onChange={(e) => setDob(e.target.value)}
//                           />
//                         </div>
//                         <div className="w-1/2 pl-2">
//                           <label className=" text-gray-700 mb-2">Giới tính</label>
//                           <div className="flex items-center">
//                             <label className="mr-4 flex items-center">
//                               <input
//                                 type="radio"
//                                 name="gender"
//                                 value="male"
//                                 className="form-radio h-4 w-4 text-yellow-500"
//                                 onChange={(e) => setGender(e.target.value)}
//                               />
//                               <span className="ml-2">Nam</span>
//                             </label>
//                             <label className="flex items-center">
//                               <input
//                                 type="radio"
//                                 name="gender"
//                                 value="female"
//                                 className="form-radio h-4 w-4 text-yellow-500"
//                                 onChange={(e) => setGender(e.target.value)}
//                               />
//                               <span className="ml-2">Nữ</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <button type="submit">Register</button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-2/5 bg-white">
//               <div className="ml-4 bg-white">cc</div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Signup;








import React, { useState, useEffect } from "react";
import Footer from './footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({}); // state lưu trữ lỗi
  const [maxDob, setMaxDob] = useState(''); // State cho max date
  const navigate = useNavigate();
  
  useEffect(() => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
    const maxDateString = maxDate.toISOString().split("T")[0]; // Chuẩn hóa thành định dạng YYYY-MM-DD
    setMaxDob(maxDateString);
  }, [])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.(com)$/;
    return re.test(String(email).toLowerCase());
};

  const validatePhone = (phone) => {
    const re = /^0[0-9]{9,10}$/;
    return re.test(String(phone));
  };

  const validateDob = (dob) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    const dayDifference = today.getDate() - dateOfBirth.getDate();

    return (
      age < 100 &&
      (age > 14 || (age === 14 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0))))
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên.';
    }
    if (!username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập.';
    }
    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ ';
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    if (!dob || !validateDob(dob)) {
      newErrors.dob = 'Ngày sinh phải lớn hơn ngày hiện tại và không quá 100 tuổi.';
    }
    if (phone.trim()) { // Chỉ kiểm tra nếu có giá trị trong số điện thoại
      if (isNaN(phone)) {
          newErrors.phone = 'Số điện thoại chỉ chứa số.';
      } else if (!phone.startsWith('0')) {
          newErrors.phone = 'Số điện thoại phải bắt đầu bằng số 0.';
      } else if (phone.length !== 10) {
          newErrors.phone = 'Số điện thoại phải có 10 chữ số.';
      }
  }
  if (!phone.trim()) {
    newErrors.phone = 'Vui lòng nhập số điện thoại.';
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios.post('http://localhost:3004/user/register', {
      username, name, email, password, dob, gender, phone
    })
    .then(res => {
      if (res.data.success) {
        navigate('/login');
      } else {
        setErrors({ form: res.data.message });
      }
    })
    .catch(err => {
      console.error(err);
      setErrors({ form: 'Đăng ký thất bại. Vui lòng thử lại.' });
    });
  };
  return (
    <div className="bg-slate-100 h-full flex flex-col pt-2 justify-center items-center">
      <div className="w-full max-w-screen-sm mx-auto mt-2 bg-white p-6 rounded-lg shadow-lg">
        <p className="text-left pt-3 font-bold rounded mb-3 text-xl"> ĐĂNG KÝ</p>
          <hr className="w-full h-full pb-6"/>
        <form className="student-form" onSubmit={handleSubmit}>
          {/* Tên */}
          <div className="mb-4">
            <label className="text-gray-700 mb-2">Tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập tên"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* Tên đăng nhập */}
          <div className="mb-4">
            <label className="text-gray-700 mb-2">Tên đăng nhập <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          {/* Số điện thoại */}
          <div className="mb-4">
            <label className="text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="text-gray-700 mb-2">Mật khẩu <span className="text-red-500">*</span></label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* Ngày sinh và giới tính */}
          <div className="flex items-center mb-4">
           <div className="w-1/2 pr-2">
              <label className="text-gray-700 mb-2">Ngày sinh <span className="text-red-500">*</span></label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded w-full"
                onChange={(e) => setDob(e.target.value)}
                max={maxDob} // Giới hạn tối đa
              />
              {errors.dob && <p className="text-red-500">{errors.dob}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="text-gray-700 mb-2">Giới tính <span className="text-red-500">*</span></label>
              <div className="flex items-center">
                <label className="mr-4 flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="form-radio h-4 w-4 text-amber-500"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2">Nam</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="form-radio h-4 w-4 text-amber  -500"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2">Nữ</span>
                </label>
              </div>
            </div>
          </div>

          {/* Nút đăng ký */}
          <div className="mt-4 pb-3">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Đăng ký
            </button>
            {errors.form && <p className="text-red-500 text-center mt-2">{errors.form}</p>}
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Signup;








