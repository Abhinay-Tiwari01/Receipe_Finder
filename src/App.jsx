// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './Component/SearchBar';
import RecipeCard from './Component/ReceipeCard';
import FilterButton from './Component/FIlterButton';
import './style.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVegOnly, setIsVegOnly] = useState(false);
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
    if (filteredRecipes.length === 0) return [];
    const cards = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (startIndex + i) % filteredRecipes.length; // wrap around
      cards.push(filteredRecipes[index]);
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

  // Filter recipes based on isVegOnly
  useEffect(() => {
    if (isVegOnly) {
      const vegFiltered = recipes.filter(recipe => {
        // Simple filter: exclude recipes with meat, fish, or poultry keywords in category or tags
        const category = recipe.strCategory ? recipe.strCategory.toLowerCase() : '';
        const tags = recipe.strTags ? recipe.strTags.toLowerCase() : '';
        if (
          category.includes('beef') ||
          category.includes('chicken') ||
          category.includes('pork') ||
          category.includes('lamb') ||
          category.includes('fish') ||
          category.includes('seafood') ||
          category.includes('meat') ||
          tags.includes('meat') ||
          tags.includes('fish') ||
          tags.includes('chicken') ||
          tags.includes('pork') ||
          tags.includes('beef') ||
          tags.includes('lamb') ||
          tags.includes('seafood')
        ) {
          return false;
        }
        return true;
      });
      setFilteredRecipes(vegFiltered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [isVegOnly, recipes]);

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
        {/* Left panel: title + search bar + filter */}
        <div className="left-panel">
          <header>
            <h1>🍔 Recipe Finder for Foodies</h1>
          </header>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={fetchRecipes}
          />
          <FilterButton isVegOnly={isVegOnly} setIsVegOnly={setIsVegOnly} />
        </div>

        {/* Right panel: slider with recipe cards */}
        <div className="right-panel">
          {isLoading ? (
            <p>Loading recipes...</p>
          ) : filteredRecipes.length > 0 ? (
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
                  {filteredRecipes.concat(filteredRecipes.slice(0, visibleCards)).map((recipe, index) => (
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
