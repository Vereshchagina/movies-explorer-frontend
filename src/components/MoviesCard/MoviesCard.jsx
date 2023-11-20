import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { convertMovieDuration } from "../../utils/utils";
import { MOVIES_URL } from "../../utils/constants";

function MoviesCard({ movie, isSaved, handleDeleteMovie, handleSaveMovie }) {
  const location = useLocation();

  function handleOpenTrailer() {
    window.open(movie.trailerLink, "_blank");
  }

  function onClickSave() {
    handleSaveMovie(movie);
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
        src={
          location.pathname === "/movies"
            ? `${MOVIES_URL}${movie.image.url}`
            : movie.thumbnail
        }
        alt={movie.nameRU}
        onClick={handleOpenTrailer}
      />

      {location.pathname === "/movies" ? (
        isSaved(movie) ? (
          <button
            type="button"
            className="movie-card__button button movie-card__button_saved"
            onClick={onClickDelete}
          />
        ) : (
          <button
            type="button"
            className="movie-card__button button movie-card__button_save"
            onClick={onClickSave}
          />
        )
      ) : (
        <button
          type="button"
          className="movie-card__button button movie-card__button_delete"
          onClick={onClickDelete}
        />
      )}
    </li>
  );
}

export default MoviesCard;
