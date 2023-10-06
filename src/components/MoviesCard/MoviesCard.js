import "./MoviesCard.css";

function MovieCard() {
    return (
        <div className="place">
            <img className="place__image" src="#" alt="Фотография места." />
            <button type="button" className="place__delete" aria-label="Удалить." />
            <div className="place__content">
                <h2 className="place__text">fgfg</h2>
                <div className="place__likes">
                    <button type="button" className="place__like" aria-label="Нравится." />
                    <span className="place__counter">0</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;