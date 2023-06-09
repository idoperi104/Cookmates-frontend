import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./assets/scss/global.scss";
import { Home } from "./views/Home";
import { About } from "./views/About";
import { RecipeIndex } from "./views/RecipeIndex";
import { RecipeDetails } from "./views/RecipeDetails";
import { RecipeEdit } from "./views/RecipeEdit";
import { AppHeader } from "./cmps/AppHeader";
import { LoginSignup } from "./views/LoginSignup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLoggedinUser } from "./store/actions/user.actions";
import { UserPage } from "./views/UserPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLoggedinUser());
  }, []);

  return (
    <Router>
      <section className="app">
        <AppHeader />

        <main className="flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe" element={<RecipeIndex />} />
            <Route path="/recipe/edit/:id?" element={<RecipeEdit />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </main>

        {/* <footer>
          <section className="container">cookRights 2023 &copy;</section>
        </footer> */}
      </section>
    </Router>
  );
}

export default App;
