import React from 'react';

function PopupWithForm({ name, children, isOpen, onClose, onSubmit }) {
  return (
    <article className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form className="form" name={name} onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
