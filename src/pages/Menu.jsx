import React, { useState } from 'react';
import MenuCard from '../component/MenuCard';
import images from '../assets/index';
import './Menu.css';
import { useDispatch } from 'react-redux';
import {addToCart} from '../store/Slice/cartSlice'

const items = [
  { id: 1, image: images.image1, name: 'Mojito', price: 10, category: 'Cocktail' },
  { id: 2, image: images.image2, name: 'Beer', price: 12, category: 'Alcoholic Beverage' },
  { id: 3, image: images.image3, name: 'Whiskey Sour', price: 14, category: 'Cocktail' },
  { id: 4, image: images.image4, name: 'Gin & Tonic', price: 16, category: 'Cocktail' },
  { id: 5, image: images.image5, name: 'IPA Beer', price: 18, category: 'Alcoholic Beverage' },
  { id: 6, image: images.image6, name: 'Old Fashioned', price: 20, category: 'Cocktail' },
  { id: 7, image: images.image7, name: 'Martini', price: 22, category: 'Cocktail' },
  { id: 8, image: images.image8, name: 'Tequila Sunrise', price: 24, category: 'Cocktail' },
  { id: 9, image: images.image9, name: 'Wine - Red', price: 26, category: 'Wine' },
  { id: 10, image: images.image10, name: 'Wine - White', price: 28, category: 'Wine' },
  { id: 11, image: images.image11, name: 'Margarita', price: 30, category: 'Cocktail' },
  { id: 12, image: images.image12, name: 'Rum & Coke', price: 32, category: 'Cocktail' },
  { id: 13, image: images.image13, name: 'Pina Colada', price: 34, category: 'Cocktail' },
  { id: 14, image: images.image14, name: 'Craft Beer', price: 36, category: 'Alcoholic Beverage' },
  { id: 15, image: images.image15, name: 'Lager Beer', price: 38, category: 'Alcoholic Beverage' }
];

const Menu = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const itemsPerPage = 3;

  // Filtering and Sorting items
  const filteredAndSortedItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) // Search by name
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price') {
        return a.price - b.price;
      } else if (sortOption === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0; // No sorting if no option is selected
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  return (
    <div className="menu-page-container">
      {/* Search and Sort Bar */}
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

      {/* Menu Cards */}
      <div className="menu-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MenuCard
              key={item.id}
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

      {/* Pagination */}
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
