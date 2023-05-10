import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRecipes,
  removeRecipe,
  setFilterBy,
} from "../store/actions/recipe.actions";
import { RecipeList } from "../cmps/RecipeList";
import { recipeService } from "../services/recipe.service.local";
import { toggleLike, updateUser } from "../store/actions/user.actions";
import { SearchBar } from "../cmps/SearchBar";
import { RecipeFilter } from "../cmps/RecipeFilter";

export function RecipeIndex() {
  const recipes = useSelector((storeState) => storeState.recipeModule.recipes);
  const filterBy = useSelector(
    (storeState) => storeState.recipeModule.filterBy
  );
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setFilterBy(recipeService.getEmptyFilterBy()));
    dispatch(loadRecipes());
  }, []);

  const onChangeFilter = useCallback((filterBy) => {
    console.log("filterBy: %%%%%%%%%", filterBy);
    dispatch(setFilterBy(filterBy));
    dispatch(loadRecipes());
  }, [filterBy]);

  const onToggleLike = (recipeId) => {
    dispatch(toggleLike(recipeId));
  };

  if (!recipes) return <div>Loading...</div>;
  return (
    <section className="recipe-index">
      {/* <pre>{JSON.stringify(loggedinUser, null,2)}</pre> */}
      {/* <button onClick={() => onToggleLiked('JypGB')}>click</button> */}
      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
      {/* <RecipeFilter filterBy={filterBy} onChangeFilter={onChangeFilter} /> */}

      <SearchBar filterBy={filterBy} onChangeFilter={onChangeFilter} />
      <RecipeFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
      <RecipeList
        recipes={recipes}
        onToggleLike={onToggleLike}
        likedIds={loggedinUser?.likedRecipesIds}
      />
    </section>
  );
}
