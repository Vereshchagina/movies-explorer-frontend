import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <section className="not-found-page">
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__subtitle">Страница не найдена</p>
            <Link className="not-found-page__link link link_blue" to={"/"}>Назад</Link>
        </section>
    )
}

export default NotFoundPage;
