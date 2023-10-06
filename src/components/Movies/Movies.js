import "./Movies.css";

import Header from "../Header/Header";
import MovieCard from "../MoviesCard/MoviesCard";

function Movies() {
    return (
        <>
            <Header isLogged={true} />
            <main>
                <MovieCard />
            </main>
        </>

    )


}

export default Movies;