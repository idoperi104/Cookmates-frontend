import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserRecipes,
  setFilterBy,
} from "../store/actions/recipe.actions";
import { Link } from "react-router-dom";
import { recipeService } from "../services/recipe.service.local";

export function LikedRecipes({likedRecipes}) {
  const recipes = useSelector(
    (storeState) => storeState.recipeModule.userRecipes
  );
  const dispatch = useDispatch();

  const filterBy = recipeService.getEmptyFilterBy()

  useEffect(() => {
    dispatch(setFilterBy({ ...filterBy, likedRecipes }));
    dispatch(loadUserRecipes());
  }, []);

  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 0) return <div>there are no liked recipes...</div>;
  return (
    <section className="liked-recipes">
      <section className="liked-recipe-list">
        {recipes.map((recipe) => (
          <article key={recipe._id} className="user-recipe-preview">
            <Link to={`/recipe/${recipe._id}`} className="info">
              <img src={recipe.imgUrl} alt="" />
              <h3 className="title">{recipe.title}</h3>
              <h4 className="description">{recipe.description}</h4>
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
}
