import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { handleFilterByDuration } from "../../utils/utils";

function SavedMovies({ isLogged, savedMovies, handleDeleteMovie }) {
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShortCheckedSaved, setIsShortCheckedSaved] = useState(false);
  const [movieRequest, setMovieRequest] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);

  function handleSearchMovies(request) {
    setMovieRequest(request);
  }

  function handleSwitchFilterSaved() {
    setIsShortCheckedSaved(!isShortCheckedSaved);
  }

  function handleSearchInSaved(movies, request, checkbox) {
    const resultOfSearch = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(request.toLowerCase())
      );
    });
    if (checkbox) {
      const resultOfSearchShorts = handleFilterByDuration(resultOfSearch);
      if (resultOfSearchShorts.length !== 0) {
        setFilteredMovies(resultOfSearchShorts);
      } else {
        setIsNotFound(true);
      }
    } else {
      setFilteredMovies(resultOfSearch);
    }
  }

  useEffect(() => {
    const moviesList = handleSearchInSaved(
      savedMovies,
      movieRequest,
      isShortCheckedSaved
    );
    setFilteredMovies(moviesList);
  }, [savedMovies, movieRequest, isShortCheckedSaved]);

  useEffect(() => {
    if (filteredMovies.length !== 0) {
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }
  }, [filteredMovies]);

  return (
    <>
      <Header isLogged={isLogged} />
      <main className="saved-movies">
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          handleSwitchFilter={handleSwitchFilterSaved}
        />
        <MoviesCardList
          savedMovies={savedMovies}
          isNotFound={isNotFound}
          handleDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
