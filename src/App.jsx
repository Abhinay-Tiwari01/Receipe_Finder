// src/App.jsx
import React, { useState, useRef } from 'react';
import SearchBar from './Component/SearchBar';
import RecipeCard from './Component/ReceipeCard';
import './style.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sliderRef = useRef(null); // reference to scroll container

  // Scroll function for arrows
  const scroll = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = 3;

  const getVisibleCards = () => {
    if (recipes.length === 0) return [];
    const cards = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (startIndex + i) % recipes.length; // wrap around
      cards.push(recipes[index]);
    }
    return cards;
  };
const cards = getVisibleCards();
 const totalCards = cards.length;

const slideNext = () => {
  setStartIndex(prev => (prev + 1) % totalCards);
};

const slidePrev = () => {
  setStartIndex(prev => (prev - 1 + totalCards) % totalCards);
};


  // Fetch recipes from API
  const fetchRecipes = async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    const data = await response.json();
    setIsLoading(false);

    if (data.meals) {
      setRecipes(data.meals);
    } else {
      setRecipes([]);
    }
  };

  return (
    <div className="app">
      {/* Main container: left + right panels */}
      <div className="main-container">
        {/* Left panel: title + search bar */}
        <div className="left-panel">
          <header>
            <h1>🍔 Recipe Finder for Foodies</h1>
          </header>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={fetchRecipes}
          />
        </div>

        {/* Right panel: slider with recipe cards */}
        <div className="right-panel">
          {isLoading ? (
            <p>Loading recipes...</p>
          ) : recipes.length > 0 ? (
            <div className="slider-wrapper">
              <div className='left-arrow'>
                {/* <button className="slider-arrow left" onClick={() => scroll(-250)}> */}
                <button className="slider-arrow left" onClick={slidePrev}>
                  &#8592;
                </button>
              </div>

              <div className="recipes-container">
                <div
                  className="cards-inner"
                  style={{
                    transform: `translateX(-${startIndex * (100 / visibleCards)}%)`,
                  }}
                >
                  {recipes.concat(recipes.slice(0, visibleCards)).map((recipe, index) => (
                    <RecipeCard
                      key={recipe.idMeal + index} // unique key
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                    />
                  ))}
                </div>


              </div>
              <div className='right-arrow'>
                {/* <button className="slider-arrow right" onClick={() => scroll(250)}> */}
                <button className="slider-arrow right" onClick={slideNext}>
                  &#8594;
                </button>
              </div>
            </div>
          ) : (
            <p>No recipes found. Try another keyword.</p>
          )}
        </div>
      </div>

      {/* Popup for selected recipe */}
      {
        selectedRecipe && (
          <div
            className="popup-overlay"
            onClick={() => setSelectedRecipe(null)}
          >
            <div className="popup-card" onClick={(e) => e.stopPropagation()}>
              <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
              <div className="popup-content">
                <h2>{selectedRecipe.strMeal}</h2>
                <p>{selectedRecipe.strInstructions}</p>
                <button onClick={() => setSelectedRecipe(null)}>Close</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default App;
