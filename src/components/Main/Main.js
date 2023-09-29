import Header from "../Header/Header";
import Promo from "../Promo/Promo";

function Main() {
    return (
        <>
            <Header isLogged={false} />
            <main>
                <Promo />

            </main>

        </>

    )
}

export default Main;