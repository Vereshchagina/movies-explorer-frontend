import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about" id="about-project">
            <h2 className="about__title">О проекте</h2>
            <div className="about__description">
                <div className="about__description-container">
                    <h3 className="about__description-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about__description-content">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>

                <div className="about__description-container">
                    <h3 className="about__description-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__description-content">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about__steps">
                <div className="about__step">
                    <p className="about__step-time about__step-time_back">1 неделя</p>
                    <p className="about__step-description">Back-end</p>
                </div>

                <div className="about__step">
                    <p className="about__step-time about__step-time_front">4 недели</p>
                    <p className="about__step-description">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject