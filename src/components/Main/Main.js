import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Footer from "../Footer/Footer";

function Main() {
    return (
        <>
            <Header isLogged={false} />
            <main>
                <Promo />
                <AboutProject />
                

            </main>
            <Footer />

        </>

    )
}

export default Main;