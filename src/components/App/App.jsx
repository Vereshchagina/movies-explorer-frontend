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
  ERROR_REGISTRATION,
  ERROR_UNAUTHORIZED,
  ERROR_AUTH,
  ERROR_UPDATE_INFO,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [resultText, setResultText] = useState("");

  const [savedMovies, setSavedMovies] = useState([]);

  //- Работа с данными пользователя: регистрация, авторизация, апдейт

  console.log(isLogged);

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
      .registration(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setErrorMessage(ERROR_NOT_UNIQUE);
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
      .authorization(email, password)
      .then((res) => {
        if (res.token) {
          setIsLogged(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          setErrorMessage(ERROR_UNAUTHORIZED);
        } else {
          setErrorMessage(ERROR_AUTH);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 4000);
      });
  };

  const handleUpdateProfile = (data) => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .updateUserInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data);
        console.log(currentUser);
        setResultText("Данные профиля успешно обновлены");
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setResultText(ERROR_NOT_UNIQUE);
        } else {
          setResultText(ERROR_UPDATE_INFO);
        }
      })
      .finally(() => {
        setTimeout(() => setResultText(""), 4000);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsLogged(false);
    setCurrentUser({});
    navigate("/", { replace: true });
  };

  //- Работа с фильмами: поиск, добавление, удаление

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main isLogged={isLogged} />} />
          <Route path="/movies" element={<Movies isLogged={isLogged} />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route
            path="/profile"
            element={
              <Profile
                isLogged={isLogged}
                handleSignOut={handleSignOut}
                handleUpdateProfile={handleUpdateProfile}
                resultText={resultText}
              />
            }
          />
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
