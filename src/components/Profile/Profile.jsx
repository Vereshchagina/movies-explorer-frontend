import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
    return (
        <>
            <Header isLogged={true} />

            <main className="main">

                <section className="profile">

                    <h1 className="profile__title">Привет, Виталий</h1>

                    <form className="profile__form" name="profile">

                        <div className="profile__form-field">
                            <label className="profile__form-label">Имя</label>
                            <input className="profile__form-input" name="name" type="text" value={"Виталий"}></input>
                        </div>
                        <span className="profile__input-error">текст ошибки</span>

                        <div className="profile__form-field last">
                            <label className="profile__form-label">E-mail</label>
                            <input className="profile__form-input" name="email" type="email" value={"pochta@yandex.ru"}></input>
                        </div>
                        <span className="profile__input-error">текст ошибки</span>

                        <p className="profile__submit-error"></p>

                        <div className="profile__actions">
                            <button className="profile__button-submit button" type="submit" aria-label="Сохранить изменения.">Coxранить</button>
                            <button className="profile__button-change button" type="button" aria-label="Редактировать профиль.">Редактировать</button>
                            <Link className="profile__logout link" to="/signin">Выйти из аккаунта</Link>
                        </div>

                    </form>

                </section>

            </main>

        </>
    )
}

export default Profile;
