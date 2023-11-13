import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        <MoviesCard />

      </ul>
      <button className="movies-list__more-btn" aria-label="Показать еще">
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
