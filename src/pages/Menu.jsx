import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuCard from '../component/MenuCard';
import './Menu.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/Slice/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);  // For storing fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 3;

  // Fetching items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products/products');
        console.log(response.data.data.products);
        setItems(response.data.data.products); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);  

  
  const filteredAndSortedItems = (items || [])
  .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  return (
    <div className="menu-page-container">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className="menu-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MenuCard
              key={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              addToCart={() => dispatch(addToCart(item))}
            />
          ))
        ) : (
          <p>No items match your search.</p>
        )}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Menu;
