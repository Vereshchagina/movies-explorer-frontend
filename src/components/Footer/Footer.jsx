import { Link } from "react-router-dom";
import "./Footer.css";


function Footer() {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__year">© {new Date().getFullYear()}</p>
                <nav className="footer__navigation">
                    <Link className="footer__link link" target="_blank" to={"https://practicum.yandex.ru/"}>Яндекс.Практикум</Link>
                    <Link className="footer__link link" target="_blank" to={"https://github.com/Vereshchagina"}>GitHub</Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;

