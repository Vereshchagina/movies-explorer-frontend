import "./Header.css";
import logo from "../../images/logo-min.svg";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

function Header({ isLogged }) {
  return (
    <header className={`header ${isLogged ? "" : "header_main"}`}>
      <Link className="header__logo" to="/">
        <img className="header__image" src={logo} alt="Логотип" />
      </Link>
      <Navigation isLogged={isLogged} />
    </header>
  );
}

export default Header;
