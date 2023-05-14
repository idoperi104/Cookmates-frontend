import { faBars, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate, withRouter } from "react-router-dom";

export function AppHeader() {
  const [isHidden, setIsHidden] = useState(true);

  const onToggleMenu = () => {
    setIsHidden((prevIsHidden) => !prevIsHidden);
  };

  const getIsHiddenClass = () => {
    return isHidden ? "is-hidden" : "";
  };

  const resetIsHidden = () => {
    setIsHidden(true);
  };

  return (
    <header className="app-header">
      <div className="header-container flex space-between align-center">
        <div className="logo-section">
          <h1 className="logo-title">Cookmates</h1>
        </div>
        <nav className={"main-nav flex " + getIsHiddenClass()}>
          <NavLink onClick={resetIsHidden} to="/">
            Home
          </NavLink>
          <NavLink onClick={resetIsHidden} to="/recipe">
            Recipes
          </NavLink>
          {/* <NavLink to="/about">About</NavLink> */}
          {/* <NavLink to="/login">Log in</NavLink> */}
          <NavLink onClick={resetIsHidden} to="/user">
            My Profile
          </NavLink>
        </nav>
        <button className="btn-toggle-menu" onClick={onToggleMenu}>
          {isHidden ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
        </button>
      </div>
    </header>
  );
}
