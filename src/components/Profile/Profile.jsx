import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import useFormValidation from "../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NAME_REGEX, EMAIL_REGEX } from "../../utils/constants";

function Profile({ isLogged, handleSignOut, handleUpdateProfile, resultText }) {
  const { values, errors, isValid, setValues, handleChange } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isSaveButton, setIsSaveButton] = useState(false);

  function handleSubmitUpdate(event) {
    event.preventDefault();
    handleUpdateProfile(values);
    setIsSaveButton(false);
  }

  function toggleSaveButton(event) {
    event.preventDefault();
    setIsSaveButton(true);
  }

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  return (
    <>
      <Header isLogged={!isLogged} />

      <main className="main">
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>

          <form
            className="profile__form"
            name="profile"
            onSubmit={handleSubmitUpdate}
          >
            <div className="profile__form-field">
              <label className="profile__form-label">Имя</label>
              <input
                className={`profile__form-input ${
                  errors.name && "profile__form-input_error"
                }`}
                name="name"
                id="name"
                type="text"
                value={values.name || currentUser.name}
                minLength={2}
                maxLength={30}
                required
                pattern={NAME_REGEX}
                onChange={handleChange}
                disabled={!isSaveButton}
              />
            </div>
            <span className="profile__input-error">{errors.name}</span>

            <div className="profile__form-field last">
              <label className="profile__form-label">E-mail</label>
              <input
                className={`profile__form-input ${
                  errors.email && "profile__form-input_error"
                }`}
                name="email"
                id="email"
                type="email"
                value={values.email || currentUser.email}
                required
                pattern={EMAIL_REGEX}
                onChange={handleChange}
                disabled={!isSaveButton}
              />
            </div>
            <span className="profile__input-error">{errors.email}</span>

            <p className="profile__submit-error">{resultText}</p>

            <div className="profile__actions">
              {isSaveButton ? (
                <button
                  className={`profile__button-submit button ${
                    (!isValid ||
                      (currentUser.name === values.name &&
                        currentUser.email === values.email)) &&
                    "profile__button-submit_disabled"
                  }`}
                  type="submit"
                  aria-label="Сохранить изменения."
                >
                  Coxранить
                </button>
              ) : (
                <button
                  className="profile__button-change button"
                  type="button"
                  aria-label="Редактировать профиль."
                  onClick={toggleSaveButton}
                >
                  Редактировать
                </button>
              )}

              <Link
                className="profile__logout link"
                to="/"
                onClick={handleSignOut}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
