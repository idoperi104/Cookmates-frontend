import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { logout } from "../store/actions/user.actions";
import { UserRecipes } from "../cmps/UserRecipes";
import { DynamicRecipes } from "../cmps/DynamicRecipes";
import { setFilterBy } from "../store/actions/recipe.actions";
import { recipeService } from "../services/recipe.service.local";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UserPage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setFilterBy(recipeService.getEmptyFilterBy()));
    };
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
      <Link className="add-recipe" to="/recipe/edit">
        <button className="btn-add">
          <FontAwesomeIcon className="icon" icon={faPlus} />
          <span className="text">add a new recipe</span>
        </button>
      </Link>

      {user.likedRecipesIds ? (
        <DynamicRecipes
          filterBy={{ ids: user.likedRecipesIds }}
          numOfColumns="4"
          subTitle="recipes you"
          title="liked"
        />
      ) : (
        ""
      )}

      <UserRecipes filterBy={{ userId: user._id }} title="your recipes" />

      <Link className="add-recipe" to="/recipe/edit">
        <button className="btn-add">
          <FontAwesomeIcon className="icon" icon={faPlus} />
          <span className="text">add a new recipe</span>
        </button>
      </Link>

      <button className="btn-logout" onClick={onLogout}>
        Log Out
      </button>
    </section>
  ) : (
    <LoginSignup />
  );
}
