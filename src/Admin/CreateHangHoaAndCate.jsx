import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateHangHoaAndCate = () => {
  // States for Hanghoa
  const [hanghoaName, setHanghoaName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // States for Category
  const [categoryName, setCategoryName] = useState('');
  const [hanghoas, setHanghoas] = useState([]); // Store all created hanghoas
  const [selectedHanghoa, setSelectedHanghoa] = useState(''); // To link a category to a hanghoa

  // Fetch existing hanghoas when the component loads
  useEffect(() => {
    const fetchHanghoas = async () => {
      try {
        const res = await axios.get('http://localhost:3004/hanghoa/all'); // Adjust API endpoint if needed
        setHanghoas(res.data);
      } catch (error) {
        setErrorMessage('Lỗi khi tải hàng hóa.');
      }
    };

    fetchHanghoas();
  }, []);

  // Create Hanghoa
  const handleCreateHanghoa = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:3004/hanghoa/create', { name: hanghoaName });
      setSuccessMessage(`Hàng hóa "${res.data.name}" đã được tạo thành công!`);
      setHanghoaName('');
      setHanghoas([...hanghoas, res.data]); // Add the new hanghoa to the dropdown
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi tạo hàng hóa.');
    } finally {
      setLoading(false);
    }
  };

  // Create Category linked to a selected Hanghoa
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!selectedHanghoa) {
      setErrorMessage('Vui lòng chọn một hàng hóa.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3004/category/them', {
        name: categoryName,
        hanghoaId: selectedHanghoa,
      });
      setSuccessMessage(`Danh mục "${res.data.name}" đã được tạo thành công!`);
      setCategoryName('');
      setSelectedHanghoa(''); // Clear the selected hanghoa
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi tạo danh mục.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tạo Hàng Hóa và Danh Mục</h2>

      {/* Success or Error Messages */}
      {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{errorMessage}</div>}

      {/* Form for creating Hanghoa */}
      <form onSubmit={handleCreateHanghoa}>
        <label htmlFor="hanghoaName" className="block text-lg font-medium text-gray-700 mb-2">
          Tên hàng hóa
        </label>
        <input
          type="text"
          id="hanghoaName"
          name="hanghoaName"
          value={hanghoaName}
          onChange={(e) => setHanghoaName(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nhập tên hàng hóa"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Đang tạo...' : 'Tạo hàng hóa'}
        </button>
      </form>

      {/* Form for creating Category */}
      <form onSubmit={handleCreateCategory} className="mt-8">
        <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700 mb-2">
          Tên danh mục
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nhập tên danh mục"
        />

        {/* Dropdown to select Hanghoa */}
        <label htmlFor="hanghoaSelect" className="block text-lg font-medium text-gray-700 mb-2">
          Chọn hàng hóa
        </label>
        <select
          id="hanghoaSelect"
          name="hanghoaSelect"
          value={selectedHanghoa}
          onChange={(e) => setSelectedHanghoa(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Chọn hàng hóa</option>
          {hanghoas.map(hanghoa => (
            <option key={hanghoa._id} value={hanghoa._id}>
              {hanghoa.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Đang tạo...' : 'Tạo danh mục'}
        </button>
      </form>
    </div>
  );
};

export default CreateHangHoaAndCate;
