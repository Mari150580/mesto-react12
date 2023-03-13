import cap from "../../images/cap.svg";
import basket from "../../images/basket.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(card);
  };

  /*Постановка лайков*/

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  /*Удаление*/

  const isOwn = card.owner._id === currentUser._id;
  const cardDelitButtonClassName = `element__baskets ${
    isOwn && "element__baskets_active"
  }`;

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className="element">
      <img
        className="element__image"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />

      <button
        className={cardDelitButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        aria-label="delit"
      >
        <img className="element__cap" src={cap} alt="Крышка" />
        <img className="element__basket" src={basket} alt="Корзина" />
      </button>

      <div className="element__point">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="like"
          ></button>
          <span className="element__counters-likes"> {card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
