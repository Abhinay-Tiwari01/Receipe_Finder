import React from 'react';

function FilterButton({ isVegOnly, setIsVegOnly }) {
  return (
    <div className="filter-container">
      <label className="filter-label">
        <input
          type="checkbox"
          checked={isVegOnly}
          onChange={(e) => setIsVegOnly(e.target.checked)}
          className="filter-checkbox"
        />
        <span className="filter-slider"></span>
        <span className="filter-text">
          {isVegOnly ? 'Vegetarian Only' : 'All Recipes'}
        </span>
      </label>
    </div>
  );
}

export default FilterButton;
