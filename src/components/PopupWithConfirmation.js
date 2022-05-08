function PopupWithConfirmation({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  card,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <article className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="form__title form__title_type_confirmation">{title}</h2>
        <form
          className="form form_type_delete-confirm"
          name={name}
          onSubmit={handleSubmit}
          noValidate
        >
          <button className="form__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithConfirmation;
