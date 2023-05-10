import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { logout } from "../store/actions/user.actions";
import { UserRecipes } from "../cmps/UserRecipes";
import { DynamicRecipes } from "../cmps/DynamicRecipes";
import { setFilterBy } from "../store/actions/recipe.actions";
import { recipeService } from "../services/recipe.service.local";

export function UserPage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setFilterBy(recipeService.getEmptyFilterBy()));
    }
  }, []);

  async function onLogout() {
    try {
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  }

  return user ? (
    <section className="user-page">
      <h2>hello {user.username}!</h2>

      <section className="add-recipe">
        <Link to="/recipe/edit">Add Recipe</Link>
      </section>

      <section className="liked-section">
        <h2>Liked recipes:</h2>
        <DynamicRecipes filterBy={{ ids: user.likedRecipesIds }} />
      </section>

      <section className="my-recipes-section">
        <h2>My recipes:</h2>
        <UserRecipes userId={user._id} />
      </section>

      <button onClick={onLogout}>Log Out</button>
    </section>
  ) : (
    <LoginSignup />
  );
}
