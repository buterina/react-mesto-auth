import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { currentUser } from './App';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    )

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `${isLiked ? 'card__like-button_filled' : 'card__like-button'}`
    )

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <li className="card">
            <img
                className="card__photo"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
                 />
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Удалить"
                onClick={handleDeleteClick}>
            </button>
            <div className="card__place">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__likes">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                        aria-label="Нравится">
                    </button>
                    <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;