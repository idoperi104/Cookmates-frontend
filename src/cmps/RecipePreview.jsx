import React from "react";
import { Link } from "react-router-dom";

export function RecipePreview({ recipe, onRemoveRecipe }) {
  return (
    <article className="recipe-preview flex space-between">
      <Link to={`/recipe/${recipe._id}`} className="info">
        <img src={recipe.imgUrl} alt="" />
        <div className="desc">
          <h2>{recipe.title}</h2>
          <h4>{recipe.description}</h4>
        </div>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveRecipe(recipe._id)}>X</button>
        <Link to={`/recipe/edit/${recipe._id}`}>Edit</Link>
      </section>
    </article>
  );
}
