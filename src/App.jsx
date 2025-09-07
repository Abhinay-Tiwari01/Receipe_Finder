// src/App.jsx
import React, { useState } from 'react';
import SearchBar from './Component/SearchBar';
import RecipeCard from './Component/ReceipeCard';
import './style.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (!searchQuery) return;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    const data = await response.json();

    if (data.meals) {
      setRecipes(data.meals);
    } else {
      setRecipes([]);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🍔 Recipe Finder for Foodies</h1>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={fetchRecipes}
      />

      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        )
         : (
          <p>No recipes found. Try another keyword.</p>
        )}
      </div>
    </div>
  );
}

export default App;
