import { Link } from "react-router-dom";
import "./AboutMe.css";
import photo from "../../images/student-photo-min.jpg";

function AboutMe() {
  return (
    <section className="about-author">
      <h2 className="about-author__title">Студент</h2>
      <div className="about-author__container">
        <div className="about-author__content">
          <h3 className="about-author__name">Виталий</h3>
          <p className="about-author__data">Фронтенд-разработчик, 30 лет</p>
          <p className="about-author__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className="about-author__link link"
            target="_blank"
            to={"https://github.com/Vereshchagina"}
          >
            Github
          </Link>
        </div>
        <img
          className="about-author__photo"
          src={photo}
          alt="Фото автора"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
