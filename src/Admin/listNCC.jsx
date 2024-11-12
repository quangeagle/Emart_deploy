import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListNCC = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3004/supplier/seen') 
      .then(res => {
        setSuppliers(res.data);
      })
      .catch(err => console.error('Error fetching suppliers:', err));
  }, []);

  const handleSupplierClick = (supplierId) => {
    navigate(`/supplier/${supplierId}/categories`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container flex flex-col mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Supplier List</h1>
        <ul className="space-y-4">
          {suppliers.map(supplier => (
            <li
              key={supplier._id}
              onClick={() => handleSupplierClick(supplier._id)}
              className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{supplier.name}</h2>
                <p className="text-gray-700">{supplier.address}</p>
                <p className="text-gray-500">{supplier.phone}</p>
              </div>
              <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ListNCC;
