import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  movies,
  savedMovies,
  isSaved,
  isLogged,
  isNotFound,
  isShortChecked,
  handleSearchMovies,
  handleSwitchFilter,
  handleDeleteMovie,
}) {
  return (
    <>
      <Header isLogged={isLogged} />
      <main className="saved-movies">
        <SearchForm
          handleSearchMovies={handleSearchMovies}
          handleSwitchFilter={handleSwitchFilter}
          isShortChecked={isShortChecked}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          isNotFound={isNotFound}
          isSaved={isSaved}
          handleDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
