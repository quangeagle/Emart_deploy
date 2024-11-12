import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    quantity: 0
  });

  useEffect(() => {
    axios.get(`http://localhost:3004/product/category/${categoryId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, [categoryId]);

  const handleAddProduct = () => {
    axios.post(`http://localhost:3004/product/themSP`, { ...newProduct, category: categoryId })
      .then(res => setProducts([...products, res.data]))
      .catch(err => console.error('Error adding product:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:3004/product/xoaSP/${productId}`)
      .then(() => setProducts(products.filter(product => product._id !== productId)))
      .catch(err => console.error('Error deleting product:', err));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = () => {
    axios.put(`http://localhost:3004/product/suaSP/${editingProduct._id}`, { ...newProduct, category: categoryId })
      .then(res => {
        setProducts(products.map(product => product._id === editingProduct._id ? res.data : product));
        setEditingProduct(null);
        setNewProduct({ name: '', price: 0, description: '', imageUrl: '', quantity: 0 });
      })
      .catch(err => console.error('Error updating product:', err));
  };

  return (
    <div className="p-6 mt-10  bg-gray-50 h-auto">
      <div className="container flex flex-col mx-auto h-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Products for Category</h1>
        <button
          onClick={() => setNewProduct({ name: '', price: 0, description: '', imageUrl: '', quantity: 0 })}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-green-600 transition"
        >
          Add New Product
        </button>
        
        {newProduct && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Description"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <input
                type="text"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {editingProduct ? (
                <button
                  onClick={handleUpdateProduct}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update Product
                </button>
              ) : (
                <button
                  onClick={handleAddProduct}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        )}

        <ul className="mt-8 space-y-4">
          {products.map(product => (
            <li key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Price: {product.price}₫</p>
                <p className="text-gray-600">Description: {product.description}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <div className="flex-shrink-0 space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
