import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  LARGE_SCREEN,
  SMALL_SCREEN,
  INITIAL_MOVIES_LARGE,
  INITIAL_MOVIES_MEDIUM,
  INITIAL_MOVIES_SMALL,
  ADDED_MOVIES_LARGE,
  ADDED_MOVIES_MEDIUM,
  ADDED_MOVIES_SMALL,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  savedMovies,
  isLoading,
  isNotFound,
  isRequestError,
  handleDeleteMovie,
  handleSaveMovie,
}) {
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [moviesAmount, setMoviesAmount] = useState();
  const [addedMoviesAmount, setAddedMoviesAmount] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();

  function handleResize() {
    setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 500);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize());
    return () => {
      window.removeEventListener("resize", handleResize());
    };
  }, []);

  useEffect(() => {
    if (screenWidth >= LARGE_SCREEN) {
      setMoviesAmount(INITIAL_MOVIES_LARGE);
      setAddedMoviesAmount(ADDED_MOVIES_LARGE);
    } else if (screenWidth < LARGE_SCREEN && screenWidth > SMALL_SCREEN) {
      setMoviesAmount(INITIAL_MOVIES_MEDIUM);
      setAddedMoviesAmount(ADDED_MOVIES_MEDIUM);
    } else {
      setMoviesAmount(INITIAL_MOVIES_SMALL);
      setAddedMoviesAmount(ADDED_MOVIES_SMALL);
    }
  }, [screenWidth, movies]);

  useEffect(() => {
    if (movies.length && location.pathname !== "/saved-movies")
      setMoviesToDisplay(movies.slice(0, moviesAmount));
    else setMoviesToDisplay(movies);
  }, [movies, location, moviesAmount]);

  function handleAddMoreMovies() {
    setMoviesToDisplay(moviesAmount + addedMoviesAmount);
  }

  function checkIsSaved(list, item) {
    return location.pathname !== "/saved-movies"
      ? list.some((movie) => movie.movieID === (item.movieId || item.id))
      : false;
  }

  return (
    <section className="movies-list">
      {isLoading && <Preloader isLoading={isLoading} />}
      <p
        className={`${
          isNotFound && !isLoading
            ? "movies-list__message"
            : "movies-list__message_invisible"
        }`}
      >
        Ничего не найдено
      </p>
      <p
        className={`${
          isRequestError && !isLoading
            ? "movies-list__message"
            : "movies-list__message_invisible"
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте еще раз.
      </p>

      <ul className="movies-list__cards">
        {moviesToDisplay.map((movie) => (
          <MoviesCard
            key={movie.id}
            isSaved={checkIsSaved(savedMovies, movie)}
            movie={movie}
            handleDeleteMovie={handleDeleteMovie}
            handleSaveMovie={handleSaveMovie}
          />
        ))}
      </ul>

      {(location.pathname === "/movies" && movies.length) > moviesAmount && (
        <button
          className="movies-list__more-btn"
          aria-label="Показать еще"
          onClick={handleAddMoreMovies}
        >
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
