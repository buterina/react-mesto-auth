import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonDisabled, buttonText, title }) {

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
      buttonText="Save"
      title={title}
      onSubmit={handleSubmit}>
      <>
        <h2 className="form__title">{title}</h2>
        <label
          className="form__field">
          <input
            className="form__input form__input_type_avatar"
            type="url" name="avatar"
            id="avatar-input"
            placeholder="Avatar link"
            autoComplete="off"
            ref={avatarRef}
            required />
          <span
            className="form__input-error avatar-input-error"></span>
        </label>
        <button
          className="form__button"
          disabled={buttonDisabled}
          type="submit">{buttonText}
        </button>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
