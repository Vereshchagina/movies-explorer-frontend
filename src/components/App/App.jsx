import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import * as authApi from "../../utils/AuthApi";
import mainApi from "../../utils/MainApi";
import {
  ERROR_NOT_UNIQUE,
  ERROR_VALIDATION,
  ERROR_REGISTRATION,
  ERROR_UNAUTHORIZED,
  ERROR_AUTH,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  //- Работа с данными пользователя: регистрация, авторизация, апдейт

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    Promise.all([mainApi.getUserInfo(jwt), mainApi.getSavedMovies(jwt)])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogged]);

  const handleRegistration = ({ name, email, password }) => {
    authApi
      .registration({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setErrorMessage(ERROR_NOT_UNIQUE);
        } else if (err.statusCode === 400) {
          setErrorMessage(ERROR_VALIDATION);
        } else {
          setErrorMessage(ERROR_REGISTRATION);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 4000);
      });
  };

  const handleAuthorization = ({ email, password }) => {
    authApi
      .authorization({ email, password })
      .then((res) => {
        if (res.token) {
          setIsLogged(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          setErrorMessage(ERROR_UNAUTHORIZED);
        } else {
          setErrorMessage(ERROR_AUTH);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 4000);
      });
  };

  //- Работа с фильмами: поиск, добавление, удаление

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signin"
            element={
              <Login
                handleAuthorization={handleAuthorization}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegistration={handleRegistration}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
