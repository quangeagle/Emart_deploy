import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  // State for product form data
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0,
    unit: '',
    categoryId: '',  // Selected category
    // supplierId: ''   // Supplier's ID, which should also be passed
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(false); // State for button loading
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const [errorMessage, setErrorMessage] = useState(''); // Error message

  useEffect(() => {
    // Fetch categories created by admin
    axios.get('http://localhost:3004/category/xem')  // Assuming this endpoint fetches all categories
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  // Submit the product data to the backend
  const createProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Post the product data to the server
      const res = await axios.post('http://localhost:3004/product/themSP', product);
      setSuccessMessage(`Sản phẩm "${res.data.name}" đã được tạo thành công!`);
      setProduct({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        quantity: "",
        unit: '',
        categoryId: '',  // Reset category selection
        // supplierId: ''   // Reset supplier selection if needed
      });
    } catch (err) {
      setErrorMessage('Lỗi khi tạo sản phẩm, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tạo Sản Phẩm Mới</h2>

      {/* Success or Error Messages */}
      {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{errorMessage}</div>}

      <form onSubmit={createProduct}>
        {/* Product Name */}
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Tên sản phẩm</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Nhập tên sản phẩm"
        />

        {/* Product Description */}
        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Mô tả</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Mô tả sản phẩm"
        />

        {/* Product Price */}
        <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Giá sản phẩm</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Nhập giá sản phẩm"
        />

        {/* Image URL */}
        <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700 mb-2">URL Hình ảnh</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="URL hình ảnh sản phẩm"
        />

        {/* Product Quantity */}
        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mb-2">Số lượng</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Nhập số lượng sản phẩm"
        />

        {/* Unit of Product */}
        <label htmlFor="unit" className="block text-lg font-medium text-gray-700 mb-2">Đơn vị tính</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={product.unit}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
          placeholder="Nhập đơn vị tính (vd: cái, kg, lít)"
        />

        {/* Category Dropdown */}
        <label htmlFor="categoryId" className="block text-lg font-medium text-gray-700 mb-2">Danh mục</label>
        <select
          id="categoryId"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md"
        >
          <option value="">Chọn danh mục</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
