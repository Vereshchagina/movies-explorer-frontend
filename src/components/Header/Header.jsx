import "./Header.css";
import logo from "../../images/logo-min.svg";
import { Link } from "react-router-dom";

function Header({ isLogged }) {
    return (
        <header className={`header ${isLogged ? "" : "header_main"}`}>
            <Link className="header__logo" to="/">
                <img src={logo} alt="Логотип" />
            </Link>
        </header>
    );
};

export default Header;