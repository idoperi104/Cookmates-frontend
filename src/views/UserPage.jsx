import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { logout } from "../store/actions/user.actions";
import { UserRecipes } from "../cmps/UserRecipes";
import { LikedRecipes } from "../cmps/LikedRecipes";
import { DynamicRecipes } from "../cmps/DynamicRecipes";

export function UserPage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

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
        <DynamicRecipes filterBy={{ ids: ["JypGB", "Vk4NP"] }} />
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
