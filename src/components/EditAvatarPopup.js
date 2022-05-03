import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            title="Обновить аватар"
            onSubmit={handleSubmit}>
            <label
                className="popup__field">
                <input
                    className="popup__input popup__input_type_avatar"
                    type="url" name="avatar"
                    id="avatar-input"
                    placeholder="Ссылка на аватар"
                    autoComplete="off"
                    ref={avatarRef}
                    required />
                <span
                    className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;