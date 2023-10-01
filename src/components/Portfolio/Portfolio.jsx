import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <Link className="portfolio__link link" target="_blank" to={"https://github.com/Vereshchagina/how-to-learn"}>Статичный сайт</Link>
                    <span className="portfolio__nav-arrow">↗</span>
                </li>

                <li className="portfolio__item">
                    <Link className="portfolio__link link" target="_blank" to={"https://github.com/Vereshchagina/russian-travel"}>Адаптивный сайт</Link>
                    <span className="portfolio__nav-arrow">↗</span>
                </li>

                <li className="portfolio__item">
                    <Link className="portfolio__link link" target="_blank" to={"https://github.com/Vereshchagina/mesto-react"}>Одностраничное приложение</Link>
                    <span className="portfolio__nav-arrow">↗</span>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;
