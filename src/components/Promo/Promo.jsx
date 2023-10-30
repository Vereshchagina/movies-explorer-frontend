import "./Promo.css";
import promoImage from "../../images/promo-image-min.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">
          Учебный проект студента факультета{" "}
          <span className="nobreak">Веб-разработки</span>.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button" type="button">
          <a className="promo__link link" href="#about-project">
            Узнать больше
          </a>
        </button>
      </div>
      <img
        className="promo__image"
        src={promoImage}
        alt="Рисунок планеты Земля"
      />
    </section>
  );
}

export default Promo;
