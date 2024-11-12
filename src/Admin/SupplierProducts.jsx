import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SupplierProducts() {
  const { supplierId } = useParams(); // Lấy ID nhà cung cấp từ URL
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => { 
    console.log('Supplier ID:', supplierId); 
    // Lấy thông tin nhà cung cấp
    axios.get(`http://localhost:3005/supplier/${supplierId}`)
      .then(response => {
        setSupplier(response.data);
      })
      .catch(error => {
        console.error('Error fetching supplier:', error);
      });

    // Lấy các sản phẩm của nhà cung cấp
    axios.get(`http://localhost:3005/product/products?supplierId=${supplierId}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [supplierId]);

  if (!supplier || products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='w-full '>
      <div className='w-4/5 h-auto bg-white ml-32 mt-5 flex flex-row'>
        {/* Phần thông tin nhà cung cấp */}
        <div className='w-1/3'>
          <img src={supplier.image} alt={supplier.name} className='w-full h-64 object-cover rounded' />
          <h2 className='text-xl font-bold mt-4'>{supplier.name}</h2>
          <p className='text-gray-500'>{supplier.description}</p>
        </div>

        {/* Phần danh sách sản phẩm của nhà cung cấp */}
        <div className='w-2/3 pl-12'>
          <h2 className='text-2xl font-semibold mb-4'>Sản phẩm của {supplier.name}</h2>
          <div className='grid grid-cols-3 gap-4'>
            {products.map(product => (
              <div key={product._id} className='border p-4'>
                <img src={product.imageUrl} alt={product.name} className='w-full h-48 object-cover mb-2' />
                <h3 className='font-semibold'>{product.name}</h3>
                <p className='text-gray-500'>{product.price}₫</p>
                <button className='mt-2 px-4 py-2 bg-yellow-500 text-white rounded'>Thêm vào giỏ</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierProducts;
