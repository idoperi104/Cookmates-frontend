import React from "react";
import { Link } from "react-router-dom";

export function RecipePreview({ recipe, onToggleLiked }) {
  return (
    <article className="recipe-preview flex space-between">
      <Link to={`/recipe/${recipe._id}`} className="info">
        <img src={recipe.imgUrl} alt="" />
        <div className="desc">
          <h2>{recipe.title}</h2>
          <h4>{recipe.description}</h4>
        </div>
      </Link>
        <button onClick={() => onToggleLiked(recipe._id)}>like</button>
    </article>
  );
}
