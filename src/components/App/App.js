import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import api from "../../utils/Api";
import EditProfilePopup from "../PopupProfile/PopupProfile";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /*Заход данных ссервера*/

  useEffect(() => {
    Promise.all([api.getAllProfile(), api.getAllTasks()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })

      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  /*Постановка лайков и получение данных ссервера про лайки*/

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }

  /*Удаление карточки*/

  function handleDeleteClick(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((data) => data._id !== card._id)
        );
      })
      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }

  /*Смена данных профиля на сервер*/

  function handleUpdateUser(data) {
    api
      .addNewProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }

  /*Смена аватарки*/

  function handleUpdateAvatar(avatar) {
    api
      .addNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log("Ошибка avatar", err);
      });
  }

  /*Загрузка новой карточки*/

  function handleAddPlaceSubmit(data) {
    api
      .addNewTasks(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log("Ошибка", err);
      });
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="delit"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
