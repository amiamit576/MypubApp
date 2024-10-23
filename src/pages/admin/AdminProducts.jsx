import React, { useState, useEffect } from 'react';
import axiosInstance from './../../services/axiosInstance';
import './AdminProducts.css'

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
  });
  const [editProduct, setEditProduct] = useState(null); // State to hold the product being edited

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/admin/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error.response?.data?.message);
    }
  };

  const handleProductCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);

    try {
      await axiosInstance.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchProducts();
      setNewProduct({ name: '', price: '', category: '', image: null });
    } catch (error) {
      console.error('Error creating product:', error.response?.data?.message);
    }
  };

  const handleProductUpdate = async (productId) => {
    const formData = new FormData();
    formData.append('name', editProduct.name);
    formData.append('price', editProduct.price);
    formData.append('category', editProduct.category);
    
    if (editProduct.image) {
      formData.append('image', editProduct.image); // Only append image if it's updated
    }

    try {
      await axiosInstance.put(`/admin/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchProducts();
      setEditProduct(null); // Close edit form after successful update
    } catch (error) {
      console.error('Error updating product:', error.response?.data?.message);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/admin/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.response?.data?.message);
    }
  };

  const handleFileChange = (e) => {
    if (editProduct) {
      setEditProduct({ ...editProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product); // Set the product to be edited
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleProductUpdate(editProduct._id); // Call the update function on form submit
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="admin-products">
      <h3 className="admin-products__title">Products</h3>

      {/* Form for creating new products */}
      <form onSubmit={handleProductCreate} className="admin-products__form">
        <div className="admin-products__form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
        </div>
        <div className="admin-products__form-group">
          <label>Price:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
        </div>
        <div className="admin-products__form-group">
          <label>Category:</label>
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
          />
        </div>
        <div className="admin-products__form-group">
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="admin-products__button">Create Product</button>
      </form>

      {/* Edit form */}
      {editProduct && (
        <form onSubmit={handleEditSubmit} className="admin-products__form admin-products__form--edit">
          <h4>Edit Product</h4>
          <div className="admin-products__form-group">
            <label>Name:</label>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />
          </div>
          <div className="admin-products__form-group">
            <label>Price:</label>
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />
          </div>
          <div className="admin-products__form-group">
            <label>Category:</label>
            <input
              type="text"
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            />
          </div>
          <div className="admin-products__form-group">
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="admin-products__button">Save Changes</button>
          <button type="button" className="admin-products__button admin-products__button--cancel" onClick={() => setEditProduct(null)}>Cancel</button>
        </form>
      )}

<ul className="admin-products__list">
  {products.map((product) => (
    <li key={product._id} className="admin-products__list-item">
      <p className="admin-products__name">{product.name}</p>
      <p className="admin-products__price">{product.price}</p>
      <p className="admin-products__category">{product.category}</p>

      {/* Check if the image path already contains '/assets/images' */}
      <img 
        src={product.image.includes('/assets/images')
          ? `http://localhost:5000${product.image}`  // If it already contains '/assets/images', prepend the host
          : `http://localhost:5000/assets/images/${product.image}`} // Otherwise, construct the full URL
        alt={product.name} 
        className="admin-products__image" 
      />

      <button 
        onClick={() => handleEditClick(product)} 
        className="admin-products__button">
        Edit Product
      </button>
      
      <button 
        onClick={() => handleProductDelete(product._id)} 
        className="admin-products__button admin-products__button--delete">
        Delete Product
      </button>
    </li>
  ))}
</ul>


    </section>
  );
};

export default AdminProducts;
