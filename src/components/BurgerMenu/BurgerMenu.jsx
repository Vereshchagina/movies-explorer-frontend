import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./BurgerMenu.css";
import account from "../../images/icon-main-min.svg";


function BurgerMenu({ isOpen, onClose }) {

    const location = useLocation;

    return (
        <div className={`burger-menu ${isOpen ? "burger-menu_open" : ""}`}>
            <div className="burger-menu__container">
                <button className="burger-menu__close-btn" type="button" onClick={onClose} />
                <nav className="burger-menu__nav">
                    <Link className={`burger-menu__link link ${location.pathname==="/" ? "burger-menu__link_active" : ""}`} to="/">Главная</Link>
                    <Link className={`burger-menu__link link ${location.pathname==="/movies" ? "burger-menu__link_active" : ""}`} to="/movies">Фильмы</Link>
                    <Link className={`burger-menu__link link ${location.pathname==="/saved-movies" ? "burger-menu__link_active" : ""}`} to="/saved-movies">Сохраненные фильмы</Link>
                </nav>
                <Link className="burger-menu__account-link link" to="/profile">
                    Аккаунт
                    <img className="burger-menu__logo" src={account} alt="Логотип аккаунта" />
                </Link>
            </div>
        </div>
    );
};

export default BurgerMenu;
