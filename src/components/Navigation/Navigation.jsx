import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import "./Navigation.css";
import account from "../../images/icon-main-min.svg"
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation({ isLogged }) {

    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

    const openMenu = () => {
        setBurgerMenuOpen(true);
    };

    const closeMenu = () => {
        setBurgerMenuOpen(false);
    };

    const location = useLocation();

    return (
        <>
            {isLogged ? (
                <div className="navigation">
                    <nav className="navigation__links">
                        <Link className={`navigation__link navigation__link_reg link ${location.pathname === "/movies" ? "navigation__link_active" : ""}`} to="/movies">Фильмы</Link>
                        <Link className={`navigation__link navigation__link_reg link ${location.pathname === "/saved-movies" ? "navigation__link_active" : ""}`} to="/saved-movies">Сохраненные фильмы</Link>
                    </nav>
                    <Link className="navigation__account-link link" to="/profile">
                        Аккаунт
                        <img className="navigation__account-logo" src={account} alt="Логотип аккаунта" />
                    </Link>
                    <button className="navigation__burger-btn button" type="button" onClick={openMenu} />
                </div>
            ) : (
                <div className="navigation">
                    <Link className="navigation__link navigation__link_unreg link" to="/signup">Регистрация</Link>
                    <Link to="/signin">
                        <button className="navigation__button button" type="button">Войти</button>
                    </Link>
                </div>
            )}

            <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closeMenu} />
        </>
    )
}

export default Navigation;
