import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRecipes,
  removeRecipe,
  setFilterBy,
} from "../store/actions/recipe.actions";
import { RecipeList } from "../cmps/RecipeList";
import { recipeService } from "../services/recipe.service.local";
import { updateUser } from "../store/actions/user.actions";

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
    dispatch(setFilterBy(recipeService.getEmptyFilterBy()));
    dispatch(loadRecipes());
  }, []);

  const onChangeFilter = (filterBy) => {
    dispatch(setFilterBy(filterBy));
    dispatch(loadRecipes());
  };

  const onToggleLiked = (recipeId) => {
    if (!loggedinUser) return;

    const likedIds = loggedinUser.likedRecipesIds || [];
    const idx = likedIds.findIndex((id) => id === recipeId);
    console.log("idx: ", idx);
    if (idx === -1) likedIds.push(recipeId);
    else likedIds.splice(idx, 1);

    dispatch(updateUser({...loggedinUser, likedRecipesIds: likedIds}));
  };

  if (!recipes) return <div>Loading...</div>;
  return (
    <section className="recipe-index">
        <pre>{JSON.stringify(loggedinUser, null,2)}</pre>
        {/* <button onClick={() => onToggleLiked('JypGB')}>click</button> */}
      {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
      {/* <RecipeFilter filterBy={filterBy} onChangeFilter={onChangeFilter} /> */}
      <RecipeList recipes={recipes} onToggleLiked={onToggleLiked} likedIds={loggedinUser?.likedRecipesIds} />
    </section>
  );
}
