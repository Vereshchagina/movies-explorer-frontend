import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo-min.svg";

function Register() {
  return (
    <section className="register">
      <Link className="register__logo" to="/">
        <img className="register__image" src={logo} alt="Логотип" />
      </Link>

      <h1 className="register__title">Добро пожаловать!</h1>

      <form className="register__form">
        <div className="register__form-field">
          <label className="register__form-label">Имя</label>
          <input
            className="register__form-input"
            name="name"
            type="text"
            placeholder="Введите ваше имя"
            value={"Виталий"}
            minLength={2}
            maxLength={30}
            required
          ></input>
        </div>

        <div className="register__form-field">
          <label className="register__form-label">E-mail</label>
          <input
            className="register__form-input"
            name="name"
            type="email"
            placeholder="Введите адрес электронной почты"
            value={"pochta@yandex.ru"}
            minLength={2}
            maxLength={30}
            required
          ></input>
        </div>

        <div className="register__form-field">
          <label className="register__form-label">Пароль</label>
          <input
            className="register__form-input"
            name="name"
            type="password"
            placeholder="Введите пароль"
            value={"••••••••••••••"}
            minLength={2}
            maxLength={30}
            required
          ></input>
          <span className="register__input-error">Что-то пошло не так...</span>
        </div>

        <button
          className="register__button-submit button"
          type="submit"
          aria-label="Зарегистрироваться."
        >
          Зарегистрироваться
        </button>

        <div className="register__actions">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link className="register__login link link_blue" to="/signin">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
