import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeService } from "../services/recipe.service.local";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toggleLike } from "../store/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

export function DynamicRecipes({ title, filterBy }) {
  const [recipes, setRecipes] = useState(null);
  const dispatch = useDispatch();

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  );

  useEffect(() => {
    fetchRecipes();
  }, [loggedinUser]);

  const fetchRecipes = async () => {
    const recipes = await recipeService.query(filterBy);
    setRecipes(recipes);
  };

  const onToggleLike = (recipeId) => {
    dispatch(toggleLike(recipeId));
  };

  const getLikedClass = (recipeId) => {
    return loggedinUser?.likedRecipesIds.includes(recipeId) ? "liked" : "";
  };

  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 0) return <div>there are no recipes...</div>;
  return (
    <section className="dynamic-recipes">
      <h2>{title}</h2>
      <section className="recipe-list">
        {recipes.map((recipe) => (
          <article
            key={recipe._id}
            className={"recipe-preview " + getLikedClass(recipe._id)}
          >
            <Link to={`/recipe/${recipe._id}`} className="info">
              <img src={recipe.imgUrl} alt="" />
              <h3 className="title">{recipe.title}</h3>
              <h4 className="description">{recipe.description}</h4>
            </Link>
            <button
              className="btn-like"
              onClick={() => onToggleLike(recipe._id)}
            >
              {/* <FontAwesomeIcon icon={faHeart} /> */}
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
