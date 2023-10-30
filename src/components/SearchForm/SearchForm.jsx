import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { SEARCH_FORM_ERROR } from "../../utils/constants";

function SearchForm({ handleSearchMovies, onChangeFilter, isShortChecked }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [movieRequest, setMovieRequest] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/movies" && localStorage.getItem("searchedMovies")) {
      const search = localStorage.getItem("searchedMovies");
      setMovieRequest(search);
    }
  }, [pathname]);

  function onChangeRequest(event) {
    setMovieRequest(event.target.value);
  }

  function handleSubmitSearch(event) {
    event.preventDefault();
    if (movieRequest === "") {
      setErrorMessage(SEARCH_FORM_ERROR);
    } else {
      setErrorMessage("");
      handleSearchMovies(movieRequest);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitSearch}>
        <div className="search__container">
          <input
            className="search__input"
            id="search-input"
            type="text"
            placeholder="Фильм"
            value={movieRequest}
            onChange={onChangeRequest}
          />
          <button className="search__button button" type="submit">
            Поиск
          </button>
        </div>
        <span className="search__error">{errorMessage}</span>
      </form>

      <FilterCheckbox
        onChangeFilter={onChangeFilter}
        isCheckedShort={isShortChecked}
      />
    </section>
  );
}

export default SearchForm;
