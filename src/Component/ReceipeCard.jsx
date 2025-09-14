import React from 'react';

function RecipeCard({ recipe ,onClick}) {
  // Determine the valid URL
  // const recipeLink = recipe.strSource || recipe.strYoutube || '#';

  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>

      {/* {recipeLink !== '#' ? (
        <a href={recipeLink} target="_blank" rel="noopener noreferrer">
          View Recipe
        </a>
      ) :
        (
          <p>No recipe link available.</p>
        )} */}
    </div>
  );
}

export default RecipeCard;
