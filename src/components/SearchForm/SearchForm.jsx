import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" type="text" placeholder="Фильм" required></input>
                <button className="search__button button">Поиск</button>
            </form>
            <FilterCheckbox/>
        </section>
    )
}

export default SearchForm;
