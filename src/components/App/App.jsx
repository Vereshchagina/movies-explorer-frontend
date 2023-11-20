import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./App.css";

import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

import mainApi from "../../utils/MainApi";
import * as authApi from "../../utils/AuthApi";
import * as moviesApi from "../../utils/MoviesApi";

import {
  ERROR_NOT_UNIQUE,
  ERROR_REGISTRATION,
  ERROR_UNAUTHORIZED,
  ERROR_AUTH,
  ERROR_UPDATE_INFO,
  ERROR_BAD_REQUEST,
} from "../../utils/constants";

function App() {
  /* Стейт переменные для функционала по пользователю */
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  /* Стейт переменные для функционала по фильмам */
  const [moviesBase, setMoviesBase] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState(savedMovies);
  const [filteredSavedMovies, setFilteredSavedMovies] =
    useState(shownSavedMovies);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShortChecked, setIsShortChecked] = useState(false);
  const [isShortCheckedSaved, setIsShortCheckedSaved] = useState(false);

  /* Стейт переменные для ошибок, сообщений и загрузки */
  const [errorMessage, setErrorMessage] = useState("");
  const [resultText, setResultText] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);

  /* Переменные для навигации */
  const navigate = useNavigate();
  const location = useLocation();

  /* Функционал по пользователю */

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Promise.all([mainApi.getUserInfo(jwt), mainApi.getSavedMovies(jwt)])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies.reverse());
          setIsLogged(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.log(err);
          setIsCheckToken(false);
        });
    } else {
      setIsLogged(false);
      setIsCheckToken(false);
    }
  }, [isLogged]);

  const handleRegistration = ({ name, email, password }) => {
    setIsSubmitting(true);
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
        setIsSubmitting(false);
      });
  };

  const handleAuthorization = ({ email, password }) => {
    setIsSubmitting(true);
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
        if (err === "Ошибка: 400") {
          setErrorMessage(ERROR_BAD_REQUEST);
        } else if (err === "Ошибка: 401") {
          setErrorMessage(ERROR_UNAUTHORIZED);
        } else {
          setErrorMessage(ERROR_AUTH);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 4000);
        setIsSubmitting(false);
      });
  };

  const handleUpdateProfile = (data) => {
    const jwt = localStorage.getItem("jwt");
    setIsSubmitting(true);
    mainApi
      .updateUserInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data);
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
        setIsSubmitting(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsLogged(false);
    setCurrentUser({});
    setInitialMovies([]);
    setSavedMovies([]);
    setMoviesToRender([]);
    setIsShortChecked(false);
    navigate("/", { replace: true });
  };

  /* Функции общего плана и функции с запросами к серверу по фильмам */

  const handleDeleteMovie = (movie) => {
    const jwt = localStorage.getItem("jwt");
    const deletedMovie = savedMovies.find(
      (item) =>
        item.movieId === (movie.id || movie.movieId) &&
        item.owner === currentUser._id
    );
    if (!deletedMovie) return;
    mainApi
      .deleteMovie(deletedMovie._id, jwt)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((item) => item._id !== deletedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .addMovie(movie, jwt)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchInBase = (movies, request, checkbox) => {
    const resultOfSearch = movies.filter((movie) => {
      return (
        movie.nameRU
          .toLowerCase()
          .trim()
          .includes(request.toLowerCase().trim()) ||
        movie.nameEN.toLowerCase().trim().includes(request.toLowerCase().trim())
      );
    });
    if (checkbox) {
      return handleFilterByDuration(resultOfSearch);
    } else {
      return resultOfSearch;
    }
  };

  const handleFilterByDuration = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  /* Функции для страницы фильмов */

  useEffect(() => {
    const isShortChecked = localStorage.getItem("isShortChecked") === "true";
    setIsShortChecked(isShortChecked);
    setSearchQuery(localStorage.getItem("searchQuery") || "");

    const moviesToRenderData = localStorage.getItem("moviesToRender");
    if (moviesToRenderData) {
      const movies = JSON.parse(moviesToRenderData);
      setInitialMovies(movies);
      setMoviesToRender(
        isShortChecked ? handleFilterByDuration(movies) : movies
      );
    }
  }, [location.pathname]);

  const handleSearchMovies = (request) => {
    localStorage.setItem("searchQuery", request);
    localStorage.setItem("isShortChecked", isShortChecked);

    if (localStorage.getItem("moviesBase")) {
      setMoviesBase(JSON.parse(localStorage.getItem("moviesBase")));
      handleSetListToRender(moviesBase, request, isShortChecked);
    } else {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          localStorage.setItem("moviesBase", JSON.stringify(movies));
          setMoviesBase(movies);
          handleSetListToRender(movies, request, isShortChecked);
        })
        .catch((err) => {
          setIsRequestError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSetListToRender = (movies, request, checkbox) => {
    const list = handleSearchInBase(movies, request, false);
    if (list.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setInitialMovies(list);
    setMoviesToRender(checkbox ? handleFilterByDuration(list) : list);
    localStorage.setItem("moviesToRender", JSON.stringify(list));
  };

  const isSaved = (movie) => {
    return savedMovies.some(
      (item) => item.movieId === movie.id && item.owner === currentUser._id
    );
  };

  const handleSwitchFilter = () => {
    setIsShortChecked(!isShortChecked);
    if (!isShortChecked) {
      setMoviesToRender(handleFilterByDuration(initialMovies));
      if (handleFilterByDuration(initialMovies).length === 0) {
        setIsNotFound(true);
      }
    } else {
      setMoviesToRender(initialMovies);
      setIsNotFound(false);
    }
    localStorage.setItem("isShortChecked", !isShortChecked);
  };

  /* Функции для страницы сохраненных фильмов*/

  useEffect(() => {
    if (localStorage.getItem("isShortCheckedSaved") === "true") {
      setIsShortCheckedSaved(true);
      setShownSavedMovies(handleFilterByDuration(savedMovies));
    } else {
      setIsShortCheckedSaved(false);
      setShownSavedMovies(savedMovies);
    }
  }, [savedMovies]);

  const handleSwitchFilterSaved = () => {
    if (!isShortCheckedSaved) {
      setIsShortCheckedSaved(true);
      localStorage.setItem("isShortCheckedSaved", true);
      setShownSavedMovies(handleFilterByDuration(filteredSavedMovies));
      if (handleFilterByDuration(filteredSavedMovies).length === 0) {
        setIsNotFound(true);
      }
      setIsNotFound(false);
    } else {
      setIsShortCheckedSaved(false);
      localStorage.setItem("isShortCheckedSaved", false);
      if (filteredSavedMovies.length === 0) {
        setIsNotFound(true);
      }
      setShownSavedMovies(filteredSavedMovies);
      setIsNotFound(false);
    }
  };

  const handleSearchInSavedMovies = (request) => {
    const resultOfSearchSaved = handleSearchInBase(savedMovies, request, false);
    if (resultOfSearchSaved.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
      setFilteredSavedMovies(resultOfSearchSaved);
      setShownSavedMovies(
        isShortCheckedSaved
          ? handleFilterByDuration(resultOfSearchSaved)
          : resultOfSearchSaved
      );
    }
  };

  return (
    <>
      {isCheckToken ? (
        <Preloader isLoading={true} />
      ) : (
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route path="/" element={<Main isLogged={isLogged} />} />

              <Route
                path="/signup"
                element={
                  isLogged ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Register
                      handleRegistration={handleRegistration}
                      errorMessage={errorMessage}
                      isSubmitting={isSubmitting}
                    />
                  )
                }
              />

              <Route
                path="/signin"
                element={
                  isLogged ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login
                      handleAuthorization={handleAuthorization}
                      errorMessage={errorMessage}
                      isSubmitting={isSubmitting}
                    />
                  )
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLogged={isLogged}
                    handleSignOut={handleSignOut}
                    handleUpdateProfile={handleUpdateProfile}
                    resultText={resultText}
                    isSubmitting={isSubmitting}
                  />
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    movies={moviesToRender}
                    savedMovies={savedMovies}
                    searchQuery={searchQuery}
                    isSaved={isSaved}
                    isLogged={isLogged}
                    isLoading={isLoading}
                    isNotFound={isNotFound}
                    isRequestError={isRequestError}
                    isShortChecked={isShortChecked}
                    handleSearchMovies={handleSearchMovies}
                    handleSwitchFilter={handleSwitchFilter}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSaveMovie={handleSaveMovie}
                  />
                }
              />

              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    movies={shownSavedMovies}
                    savedMovies={savedMovies}
                    isSaved={isSaved}
                    isLogged={isLogged}
                    isNotFound={isNotFound}
                    isShortChecked={isShortCheckedSaved}
                    handleSearchMovies={handleSearchInSavedMovies}
                    handleSwitchFilter={handleSwitchFilterSaved}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                }
              />

              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </CurrentUserContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
