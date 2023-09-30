import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Footer from "../Footer/Footer";
import Techs from "../Techs/Techs";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function Main() {
    return (
        <>
            <Header isLogged={false} />
            <main>
                <Promo />
                <AboutProject />
                <Techs />
                

            </main>
            <Footer />
            <NotFoundPage />

        </>

    )
}

export default Main;