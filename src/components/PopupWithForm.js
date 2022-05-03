function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit, buttonDisabled }) {
    return (
        <article className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form
                    className="popup__form" 
                    name={name}
                    onSubmit={onSubmit}
                    noValidate>

                    {children}

                    <button
                        className="popup__button"
                        disabled={buttonDisabled}
                        type="submit">{buttonText}
                    </button>
                </form>
            </div>
        </article>
    )
}

export default PopupWithForm;