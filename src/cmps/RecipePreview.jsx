import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function RecipePreview({ recipe, onToggleLike, likedIds }) {
  const getLikedClass = () => {
    return likedIds?.includes(recipe._id) ? "liked" : "";
  };

  return (
    <article className={"recipe-preview flex space-between " + getLikedClass()}>
      <Link to={`/recipe/${recipe._id}`} className="info">
        <img src={recipe.imgUrl} alt="" />
        <div className="desc">
          <h2>{recipe.title}</h2>
          <h4>{recipe.description}</h4>
        </div>
      </Link>
      <button
        className="btn-like"
        onClick={() => onToggleLike(recipe._id)}
      >
        {/* <FontAwesomeIcon icon={faHeart} /> */}
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="cover"></div>
    </article>
  );
}
