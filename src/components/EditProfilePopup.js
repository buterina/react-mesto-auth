import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            title="Редактировать профиль"
            onSubmit={handleSubmit}>
            <>
                <label
                    className="popup__field">
                    <input
                        className="popup__input popup__input_type_name"
                        value={name || ''}
                        onChange={handleNameChange}
                        id="name-input"
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        minLength="2"
                        maxLength="40"
                        autoComplete="off"

                        required />
                    <span
                        className="popup__input-error name-input-error"></span>
                </label>

                <label
                    className="popup__field">
                    <input
                        value={description || ''}
                        onChange={handleDescriptionChange}
                        className="popup__input popup__input_type_about"
                        id="bio-input"
                        type="text"
                        name="about"
                        placeholder="Ваш род занятий"
                        minLength="2"
                        maxLength="200"
                        autoComplete="off"
                        required />
                    <span
                        className="popup__input-error bio-input-error"></span>
                </label>
            </>
        </PopupWithForm>)
}

export default EditProfilePopup;