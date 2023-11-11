import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo-min.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Login({ handleAuthorization, errorMessage }) {
  const { values, errors, isValid, handleChange, resetValidation } =
    useFormValidation();

  function handleSubmitLogin(event) {
    event.preventDefault();
    handleAuthorization(values);
    resetValidation();
  }

  return (
    <section className="login">
      <Link className="login__logo" to="/">
        <img className="login__image" src={logo} alt="Логотип" />
      </Link>

      <h1 className="login__title">Рады видеть!</h1>

      <form className="login__form" onSubmit={handleSubmitLogin}>
        <div className="login__form-field">
          <label className="login__form-label">E-mail</label>
          <input
            className={`login__form-input ${
              errors.email && "login__form-input_error"
            }`}
            name="email"
            id="email"
            type="email"
            placeholder="Введите адрес электронной почты"
            value={values.email || ""}
            required
            onChange={handleChange}
          />
          <span className="login__input-error">{errors.email || ""}</span>
        </div>

        <div className="login__form-field">
          <label className="login__form-label">Пароль</label>
          <input
            className={`login__form-input ${
              errors.password && "login__form-input_error"
            }`}
            name="password"
            id="password"
            type="password"
            placeholder="Введите пароль"
            minLength={8}
            value={values.password || ""}
            required
            onChange={handleChange}
          />
          <span className="login__input-error">{errors.password || ""}</span>
        </div>

        <span className="login__error-message">{errorMessage}</span>

        <button
          className={`login__button-submit button ${
            !isValid && "login__button-submit_disabled"
          }`}
          type="submit"
          aria-label="Вход в аккаунт."
          disabled={!isValid}
        >
          Войти
        </button>

        <div className="login__actions">
          <p className="login__text">Еще не зарегистрированы?</p>
          <Link className="login__login link link_blue" to="/signup">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
