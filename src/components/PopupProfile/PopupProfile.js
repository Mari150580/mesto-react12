import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      name="name"
      title="Редактирование профиля"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        onChange={handleName}
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        id="name"
        required=""
      />
      <input
        value={description || ""}
        onChange={handleDescription}
        type="text"
        className="popup__input popup__input_type_job"
        name="about"
        placeholder="Вид деятельности"
        minLength={2}
        maxLength={200}
        id="about"
        required=""
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
