import "./Movies.css";

import Header from "../Header/Header";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies() {
    return (
        <>
            <Header isLogged={true} />
            <main>
                <MoviesCard />
            </main>
        </>

    )


}

export default Movies;