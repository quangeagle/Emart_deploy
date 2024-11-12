import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSupplierAndCategory = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState({ name: '', address: '', phone: '' });
    const [category, setCategory] = useState({ name: '', supplierId: '' });

    useEffect(() => {
        // Lấy danh sách nhà cung cấp đã tạo
        axios.get('http://localhost:3004/supplier/seen')
            .then(res => setSuppliers(res.data))
            .catch(err => console.error('Error fetching suppliers:', err));
    }, []);

    const handleSupplierChange = (e) => {
        const { name, value } = e.target;
        setSupplier(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const createSupplier = () => {
        axios.post('http://localhost:3004/supplier/add', supplier)
            .then(res => {
                console.log('Supplier created:', res.data);
                setSuppliers([...suppliers, res.data]);
            })
            .catch(err => console.error('Error creating supplier:', err));
    };

    const createCategory = () => {
        axios.post('http://localhost:3004/category/them', category)
            .then(res => console.log('Category created:', res.data))
            .catch(err => console.error('Error creating category:', err));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="container flex flex-col mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Supplier and Category</h1>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Create Supplier</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  value={supplier.name}
                  onChange={handleSupplierChange}
                  placeholder="Supplier Name"
                  className="border border-gray-300 p-3 rounded-md"
                />
                <input
                  type="text"
                  name="address"
                  value={supplier.address}
                  onChange={handleSupplierChange}
                  placeholder="Address"
                  className="border border-gray-300 p-3 rounded-md"
                />
                <input
                  type="text"
                  name="phone"
                  value={supplier.phone}
                  onChange={handleSupplierChange}
                  placeholder="Phone"
                  className="border border-gray-300 p-3 rounded-md"
                />
                <button
                  onClick={createSupplier}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                  Create Supplier
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Category</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleCategoryChange}
                  placeholder="Category Name"
                  className="border border-gray-300 p-3 rounded-md"
                />
                <select
                  name="supplierId"
                  value={category.supplierId}
                  onChange={handleCategoryChange}
                  className="border border-gray-300 p-3 rounded-md"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={createCategory}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default CreateSupplierAndCategory;




