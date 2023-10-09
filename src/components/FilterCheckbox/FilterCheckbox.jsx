import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
        <div className="checkbox">
            <label className="checkbox__container">
                <input className="checkbox__input" type="checkbox" />
                <span className="checkbox__switch"></span>
            </label>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;
