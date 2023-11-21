import "./Movies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  movies,
  savedMovies,
  searchQuery,
  isSaved,
  isLogged,
  isLoading,
  isNotFound,
  isRequestError,
  isShortChecked,
  handleSearchMovies,
  handleSwitchFilter,
  handleDeleteMovie,
  handleSaveMovie,
}) {
  return (
    <>
      <Header isLogged={isLogged} />
      <main className="movies">
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          handleSwitchFilter={handleSwitchFilter}
          isShortChecked={isShortChecked}
          searchQuery={searchQuery}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isNotFound={isNotFound}
          isRequestError={isRequestError}
          isSaved={isSaved}
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
