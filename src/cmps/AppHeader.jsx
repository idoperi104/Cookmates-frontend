import { NavLink, useNavigate, withRouter } from "react-router-dom";

export function AppHeader(props) {
  return (
    <header className="app-header flex space-between align-center">
      <h1 className="logo">CookMates</h1>
      <nav className="main-nav flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipe">Recipes</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
