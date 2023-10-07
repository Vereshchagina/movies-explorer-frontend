import "./MoviesCard.css";
import thumbnail from "../../images/film-picture-min.svg"

function MoviesCard() {

    return (
        <div className="movie-card">
            <div className="movie-card__description">
                <h2 className="movie-card__name">В погоне за Бенкси</h2>
                <p className="movie-card__duration">0ч 42м</p>
            </div>
            <img className="movie-card__thumbnail" src={thumbnail} alt="Постер" />
            <button className="movie-card__button movie-card__button_save button" type="button" />
        </div>
    )
}

export default MoviesCard;
