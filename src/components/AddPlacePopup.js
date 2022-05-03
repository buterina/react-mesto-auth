import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    const handlePlaceChange = (e) => {
        setPlace(e.target.value)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: place,
            link
        })
    }

    React.useEffect(() => {
        setPlace('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-card"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            title="Новое место"
            onSubmit={handleSubmit}>
            <>
                <label
                    className="popup__field">
                    <input
                        className="popup__input popup__input_type_card-name"
                        onChange={handlePlaceChange}
                        value={place || ''}
                        type="text"
                        name="place"
                        id="place-input"
                        placeholder="Название"
                        autoComplete="off"
                        minLength="2"
                        maxLength="30"
                        required />
                    <span
                        className="popup__input-error place-input-error"></span>
                </label>

                <label
                    className="popup__field">
                    <input
                        className="popup__input popup__input_type_card-link"
                        onChange={handleLinkChange}
                        value={link || ''}
                        type="url"
                        name="link"
                        id="link-input"
                        placeholder="Ссылка на картинку"
                        autoComplete="off"
                        required />
                    <span
                        className="popup__input-error link-input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;