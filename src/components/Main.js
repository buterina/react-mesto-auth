import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Avatar"
            />
            <button
              className="profile__avatar-button"
              type="button"
              aria-label="Edit avatar"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__description">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Edit profile"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__bio">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add avatar"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__gallery">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
