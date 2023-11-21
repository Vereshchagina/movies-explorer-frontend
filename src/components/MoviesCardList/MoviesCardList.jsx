import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  LARGE_SCREEN,
  MEDIUM_SCREEN,
  INITIAL_MOVIES_LARGE,
  INITIAL_MOVIES_MEDIUM,
  INITIAL_MOVIES_SMALL,
  ADDED_MOVIES_LARGE,
  ADDED_MOVIES_MEDIUM,
  ADDED_MOVIES_SMALL,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  isSaved,
  isLoading,
  isNotFound,
  isRequestError,
  handleDeleteMovie,
  handleSaveMovie,
}) {
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth >= LARGE_SCREEN) {
      setMoviesAmount(INITIAL_MOVIES_LARGE);
      setAddedMoviesAmount(ADDED_MOVIES_LARGE);
    } else if (screenWidth < LARGE_SCREEN && screenWidth >= MEDIUM_SCREEN) {
      setMoviesAmount(INITIAL_MOVIES_MEDIUM);
      setAddedMoviesAmount(ADDED_MOVIES_MEDIUM);
    } else if (screenWidth < MEDIUM_SCREEN) {
      setMoviesAmount(INITIAL_MOVIES_SMALL);
      setAddedMoviesAmount(ADDED_MOVIES_SMALL);
    }
  }, [screenWidth, movies]);

  function handleAddMoreMovies() {
    setMoviesAmount(moviesAmount + addedMoviesAmount);
  }

  return (
    <section className="movies-list">
      {isLoading && <Preloader isLoading={isLoading} />}

      {location.pathname === "/movies" ? (
        <>
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
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте еще раз.
          </p>
          <ul className="movies-list__cards">
            {movies.slice(0, moviesAmount).map((movie) => {
              return (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  isSaved={isSaved}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSaveMovie={handleSaveMovie}
                />
              );
            })}
          </ul>
          <button
            type="button"
            className={
              moviesAmount >= movies.length
                ? "movies-list__more-btn_hidden"
                : "movies-list__more-btn"
            }
            aria-label="Показать еще"
            onClick={handleAddMoreMovies}
          >
            Еще
          </button>
        </>
      ) : (
        <>
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
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте еще раз.
          </p>

          <ul className="movies-list__cards">
            {movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  isSaved={isSaved}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSaveMovie={handleSaveMovie}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
