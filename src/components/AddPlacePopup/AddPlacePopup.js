import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  useEffect(() => {
    setLink("");
    setName("");
  }, [isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      name="newPlace"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_point"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        id="pointe"
        required=""
        value={name || ""}
        onChange={handleName}
      />
      <input
        className="popup__input popup__input_type_image"
        name="link"
        placeholder="Ссылка на картинку"
        id="image"
        type="url"
        required=""
        value={link || ""}
        onChange={handleLink}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
