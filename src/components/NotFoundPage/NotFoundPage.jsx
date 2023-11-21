import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClickBack = (event) => {
    navigate(-1);
  };

  return (
    <section className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <p
        className="not-found-page__link link link_blue"
        onClick={handleClickBack}
      >
        Назад
      </p>
    </section>
  );
}

export default NotFoundPage;
