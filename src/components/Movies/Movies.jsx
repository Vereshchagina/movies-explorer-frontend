import "./Movies.css";

import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <>
            <Header isLogged={true} />
            <main className="movies">
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}

export default Movies;