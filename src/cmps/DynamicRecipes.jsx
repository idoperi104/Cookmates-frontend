import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeService } from "../services/recipe.service.local";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toggleLike } from "../store/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

export function DynamicRecipes({ title, subTitle, filterBy, numOfColumns = "3" }) {
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
    return loggedinUser?.likedRecipesIds?.includes(recipeId) ? "liked" : "";
  };

  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 0) return <div>there are no recipes...</div>;
  return (
    <section className="dynamic-recipes">
      <h3 className="sub-title">{subTitle}</h3>
      <h2 className="title">{title}</h2>
      <section className={"dynamic-list list-" + numOfColumns}>
        {recipes.map((recipe) => (
          <article
            key={recipe._id}
            className={
              "dynamic-preview recipe-preview flex space-between " +
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
