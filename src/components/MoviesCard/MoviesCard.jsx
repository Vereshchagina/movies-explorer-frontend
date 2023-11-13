import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { convertMovieDuration } from "../../utils/utils";
import { MOVIES_URL } from "../../utils/constants";

function MoviesCard(movie, isSaved, handleDeleteMovie, handleSaveMovie) {
  const location = useLocation();

  function handleOpenTrailer() {
    window.open(movie.trailerLink, "_blank");
  }

  function handleMovieActions() {
    isSaved ? handleDeleteMovie(movie) : handleSaveMovie(movie);
  }

  function onClickDelete() {
    handleDeleteMovie(movie);
  }

  return (
    <li key={movie.id} className="movie-card">
      <div className="movie-card__description">
        <h2 className="movie-card__name">{movie.nameRU}</h2>
        <p className="movie-card__duration">
          {convertMovieDuration(movie.duration)}
        </p>
      </div>
      <img
        className="movie-card__thumbnail"
        src={`${MOVIES_URL}${movie.image.url}`}
        alt={movie.nameRU}
        onClick={handleOpenTrailer}
      />
      <button
        className={`movie-card__button button ${
          location.pathname === "/movies"
            ? isSaved
              ? "movie-card__button_saved"
              : "movie-card__button_save"
            : ""
        } ${
          location.pathname === "/saved-movies"
            ? "movie-card__button_delete"
            : ""
        }`}
        onClick={
          location.pathname === "/saved-movies"
            ? onClickDelete
            : handleMovieActions
        }
        type="button"
      />
    </li>
  );
}

export default MoviesCard;
