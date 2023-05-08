import React from "react";
import { Link } from "react-router-dom";

export function UserRecipePreview({ recipe, onRemoveRecipe }) {
  return (
    <article className="user-recipe-preview">
      <Link to={`/recipe/${recipe._id}`} className="info">
        <img src={recipe.imgUrl} alt="" />
        <h3 className="title">{recipe.title}</h3>
        <h4 className="description">{recipe.description}</h4>
      </Link>
      <button className="btn-remove" onClick={() => onRemoveRecipe(recipe._id)}>
        X
      </button>
      <Link className="edit" to={`/recipe/edit/${recipe._id}`}>
        <button className="btn-edit">Edit</button>
      </Link>
    </article>
  );
}
