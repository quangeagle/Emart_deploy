// const Kho = () => {
//   return (
//     <>
//           <div className=" bg-amber-400 h-14 w-full ">
//           <img src="emart.png" alt="Grab" className='  w-36 h-8 mt-2' />
//           </div>

//     </>
//   );
// };
// export default Kho;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Kho = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false); // Trạng thái hiển thị sản phẩm tồn kho

  const handleShowLowStockProducts = () => {
    setShowProducts(!showProducts); // Toggle trạng thái khi bấm vào nút
    if (!showProducts) {
      // Gọi API lấy danh sách sản phẩm tồn kho (số lượng dưới 10)
      axios.get('http://localhost:3004/kho/low-stock-products') 
        .then((response) => setLowStockProducts(response.data))
        .catch((error) => console.error('Lỗi khi tải dữ liệu:', error));  
    }
  };

  return (
    <>
      <div className="bg-amber-400 h-14 w-full flex items-center justify-between px-4">
        <img src="emart.png" alt="Emart" className="w-36 h-8" />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleShowLowStockProducts}
        >
          {showProducts ? 'Ẩn sản phẩm tồn kho' : 'Hiển thị sản phẩm tồn kho'}
        </button>
      </div>


      {showProducts && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Sản phẩm tồn kho (số lượng dưới 10):</h2>
          {lowStockProducts.length === 0 ? (
            <p>Không có sản phẩm nào có số lượng dưới 10.</p>
          ) : (
            <ul className="list-disc pl-6">
              {lowStockProducts.map((item) => (
                <li key={item.product._id} className="mb-2">
                  {item.product.name} - Số lượng: {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Kho;
