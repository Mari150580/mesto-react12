import React, { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_image"
        name="avatar"
        placeholder="Ссылка на картинку аватарки"
        id="avatar"
        type="url"
        required=""
        ref={avatarRef}
      />
      <span className="popup__input-error image-error" id="error-avatar"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
