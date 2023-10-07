import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" type="text" placeholder="Фильм" required></input>
                <button className="search__button button">Поиск</button>
            </form>
        </section>
    )
}

export default SearchForm;
