import { NavLink, useNavigate, withRouter } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header flex space-between align-center full">
      <div className="logo-section flex align-center">
        <div className="logo"></div>
        <h1 className="logo-title">Cookmates</h1>
      </div>
      <nav className="main-nav flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipe">Recipes</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/user">My Profile</NavLink>
      </nav>
    </header>
  );
}
