import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeService } from "../services/recipe.service.local";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toggleLike } from "../store/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { removeRecipe } from "../store/actions/recipe.actions";

export function UserRecipes({ title, filterBy }) {
  const [recipes, setRecipes] = useState(null);
  const dispatch = useDispatch();

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  );
  const globalRecipes = useSelector(
    (storeState) => storeState.recipeModule.recipes
  );

  useEffect(() => {
    fetchRecipes();
  }, [loggedinUser, globalRecipes]);

  const fetchRecipes = async () => {
    const recipes = await recipeService.query(filterBy);
    setRecipes(recipes);
  };

  const onToggleLike = (recipeId) => {
    dispatch(toggleLike(recipeId));
  };

  const getLikedClass = (recipeId) => {
    return loggedinUser?.likedRecipesIds?.includes(recipeId) ? "liked" : "";
  };

  const onRemoveRecipe = useCallback(async (recipeId) => {
    try {
      dispatch(removeRecipe(recipeId));
    } catch (err) {
      console.error(err);
    }
  });

  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 0) return
  return (
    <section className="user-recipes dynamic-recipes">
      <h2 className="title">{title}</h2>
      <section className={"user-recipes-list dynamic-list"}>
        {recipes.map((recipe) => (
          <article
            key={recipe._id}
            className={
              "user-recipes-preview dynamic-preview recipe-preview flex space-between " +
              getLikedClass(recipe._id)
            }
          >
            <Link to={`/recipe/${recipe._id}`} className="info">
              <img src={recipe.imgUrl} alt="" />
              <div className="desc">
                <h2>{recipe.title}</h2>
                <h4>{recipe.description}</h4>
              </div>
              <div className="cover"></div>
            </Link>
            <button
              className="btn-remove"
              onClick={() => onRemoveRecipe(recipe._id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <Link className="edit" to={`/recipe/edit/${recipe._id}`}>
              <button className="btn-edit">
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </Link>
            <button
              className="btn-like"
              onClick={() => onToggleLike(recipe._id)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
