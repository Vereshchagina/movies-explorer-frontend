import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo-min.svg"

function Login() {
    return (
        <section className="login">

            <Link className="login__logo" to="/">
                <img className="login__image" src={logo} alt="Логотип" />
            </Link>

            <h1 className="login__title">Рады видеть!</h1>

            <form className="login__form">

                <div className="login__form-field">
                    <label className="login__form-label">E-mail</label>
                    <input
                        className="login__form-input"
                        name="name"
                        type="email"
                        placeholder="Введите адрес электронной почты"
                        value={"pochta@yandex.ru"}
                        minLength={2}
                        maxLength={30}
                        required>
                    </input>
                </div>

                <div className="login__form-field">
                    <label className="login__form-label">Пароль</label>
                    <input
                        className="login__form-input"
                        name="name"
                        type="password"
                        placeholder="Введите пароль"
                        minLength={2}
                        maxLength={30}
                        required>
                    </input>
                    <span className="login__input-error">Что-то пошло не так...</span>
                </div>

                <button className="login__button-submit button" type="submit" aria-label="Вход в аккаунт.">Войти</button>

                <div className="login__actions">
                    <p className="login__text">Еще не зарегистрированы?</p>
                    <Link className="login__register link link_blue" to="/signup">Регистрация</Link>
                </div>

            </form>

        </section>
    )

}

export default Login;