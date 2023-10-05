import "./Header.css";
import logo from "../../images/logo-min.svg";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

function Header({ isLogged }) {
    return (
        <header className={`header ${isLogged ? "" : "header_main"}`}>
            <Link className="header__logo" to="/">
                <img src={logo} alt="Логотип" />
            </Link>
            <Navigation isLogged={false}/>
        </header>
    );
};

export default Header;