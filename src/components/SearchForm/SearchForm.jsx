import { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { SEARCH_FORM_ERROR } from "../../utils/constants";

function SearchForm({
  handleSearchMovies,
  handleSwitchFilter,
  isShortChecked,
  searchQuery,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [movieRequest, setMovieRequest] = useState("");

  useEffect(() => {
    setMovieRequest(searchQuery);
  }, [searchQuery]);

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
            value={movieRequest || ""}
            onChange={onChangeRequest}
          />
          <button className="search__button button" type="submit">
            Поиск
          </button>
        </div>
        <span className="search__error">{errorMessage}</span>
      </form>

      <FilterCheckbox
        onChangeFilter={handleSwitchFilter}
        isShortChecked={isShortChecked}
      />
    </section>
  );
}

export default SearchForm;
