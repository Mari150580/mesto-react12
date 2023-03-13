import "../../index.css";
import pencil from "../../images/Vector.svg";
import Card from "../Card/Card";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__block" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Кусто"
            className="profile__avatar"
          />
          <div className="profile__avatar-background">
            <img
              className="profile__avatar-pencil"
              src={pencil}
              alt="Карандаш"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
            aria-label="open"
          ></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button link"
          type="button"
          aria-label="insert"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
