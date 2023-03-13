function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  closeEscape,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onKeyUp={closeEscape}
    >
      <div className={`popup__container`}>
        <button
          onClick={onClose}
          className={`popup__close popup__close_${name} `}
          type="button"
          aria-label="close"
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_${name}`}
          name={name}
          action="URL"
        >
          {children}

          <button
            type="submit"
            className={`popup__button popup__button_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
