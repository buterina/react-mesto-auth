import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <article className={`popup popup_type_photo ${card.link && 'popup_opened'}`}> 
            <div className="popup__container">
                <button 
                className="popup__close-button" 
                type="button" 
                aria-label="Закрыть"
                onClick={onClose}>
                    </button>
                <figure className="popup__image">
                    <img 
                    className="popup__photo"
                    src={card.link}
                    alt={card.name} />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </article>
    )
}

export default ImagePopup;