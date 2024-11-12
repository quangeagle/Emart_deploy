import { Link } from 'react-router-dom';
import React from 'react';

const QlNhaCC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container flex flex-col mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Quản Lý Nhà Cung Cấp</h1>
        <div className="flex flex-col space-y-4">
          <Link
            to="/taonhacungcap"
            className="block bg-blue-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Tạo Nhà Cung Cấp
          </Link>
          <Link
            to="/dsncc"
            className="block bg-green-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Danh Sách Nhà Cung Cấp
          </Link>
          <Link
            to="/create-promotion"
            className="block bg-purple-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            Thêm Khuyến Mãi
          </Link>
          <Link
            to="/Hang"
            className="block bg-purple-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
           HangHoa
          </Link>
          
          <Link
            to="/create-product"
            className="block bg-purple-500 text-white text-center py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
           Tạo sản phẩm
          </Link>

        </div>
      </div>
    </div>
  );
};

export default QlNhaCC;
