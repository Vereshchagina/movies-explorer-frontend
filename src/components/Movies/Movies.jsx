import { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import * as moviesApi from "../../utils/MoviesApi";
import { handleFilterByDuration } from "../../utils/utils";

function Movies({ isLogged, handleDeleteMovie, handleSaveMovie, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isShortChecked, setIsShortChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function handleSearchInBase(movies, request, checkbox) {
    const resultOfSearch = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(request.toLowerCase())
      );
    });
    setFoundMovies(resultOfSearch);
    if (checkbox) {
      setFilteredMovies(handleFilterByDuration(resultOfSearch));
    } else {
      setFilteredMovies(resultOfSearch);
    }
    localStorage.setItem("foundMovies", JSON.stringify(resultOfSearch));
  }



  function handleSwitchFilter() {
    setIsShortChecked(!isShortChecked);
    if (!isShortChecked) {
      if (handleFilterByDuration(foundMovies).length === 0) {
        setIsNotFound(true);
      }
    } else {
      setFilteredMovies(foundMovies);
    }
    localStorage.setItem("isShortChecked", !isShortChecked);
  }

  function handleSearchMovies(request) {
    localStorage.setItem("movieSearch", request);
    localStorage.setItem("isShortChecked", isShortChecked);

    if (localStorage.getItem("moviesBase")) {
      const allMovies = JSON.parse(localStorage.getItem("moviesBase"));
      handleSearchInBase(allMovies, request, isShortChecked);
    } else {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          console.log(movies);
          localStorage.setItem("moviesBase", JSON.stringify(movies));
          handleSearchInBase(movies, request, isShortChecked);
        })
        .catch((err) => {
          setIsRequestError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      const movies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundMovies(movies);
      if (localStorage.getItem("isShortChecked") === "true") {
        setFilteredMovies(handleFilterByDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isShortChecked") === "true") {
      setIsShortChecked(true);
    } else {
      setIsShortChecked(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <>
      <Header isLogged={isLogged} />
      <main className="movies">
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          handleSwitchFilter={handleSwitchFilter}
          isShortChecked={isShortChecked}
        />
        <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isNotFound={isNotFound}
          isRequestError={isRequestError}
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
