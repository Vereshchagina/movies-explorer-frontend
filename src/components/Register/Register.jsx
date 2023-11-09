import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo-min.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { NAME_REGEX, EMAIL_REGEX } from "../../utils/constants";

function Register({ handleRegistration, errorMessage }) {
  const { values, errors, isValid, handleChange, resetValidation } =
    useFormValidation();

  function handleSubmitRegister(event) {
    event.preventDefault();
    handleRegistration(values.name, values.email, values.password);
    resetValidation();
  }

  return (
    <section className="register">
      <Link className="register__logo" to="/">
        <img className="register__image" src={logo} alt="Логотип" />
      </Link>

      <h1 className="register__title">Добро пожаловать!</h1>

      <form className="register__form" onSubmit={handleSubmitRegister}>
        <div className="register__form-field">
          <label className="register__form-label">Имя</label>
          <input
            className={`register__form-input ${
              errors.name && "register__form-input_error"
            }`}
            name="name"
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            value={values.name || ""}
            minLength={2}
            maxLength={30}
            required
            pattern={NAME_REGEX}
            onChange={handleChange}
          />
          <span className="register__input-error">{errors.name || ""}</span>
        </div>

        <div className="register__form-field">
          <label className="register__form-label">E-mail</label>
          <input
            className={`register__form-input ${
              errors.email && "register__form-input_error"
            }`}
            name="email"
            id="email"
            type="email"
            placeholder="Введите адрес электронной почты"
            value={values.email || ""}
            required
            pattern={EMAIL_REGEX}
            onChange={handleChange}
          />
          <span className="register__input-error">{errors.email || ""}</span>
        </div>

        <div className="register__form-field">
          <label className="register__form-label">Пароль</label>
          <input
            className={`register__form-input ${
              errors.password && "register__form-input_error"
            }`}
            name="password"
            id="password"
            type="password"
            placeholder="Введите пароль"
            value={values.password || ""}
            minLength={8}
            required
            onChange={handleChange}
          />
          <span className="register__input-error">{errors.password || ""}</span>
        </div>

        <span className="register__error-message">{errorMessage}</span>

        <button
          className={`register__button-submit button ${
            !isValid && "register__button-submit_disabled"
          }`}
          type="submit"
          disabled={!isValid}
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
