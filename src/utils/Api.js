const configs = {
  url: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    "content-type": "application/json",
    authorization: " a9f160f0-4a9e-440f-9994-b1753847a649",
  },
};

export class Api {
  #onResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({
        message: `Ошибка отправки картинки на стороне сервера`,
        response,
      });
    }
  }

  constructor(configs) {
    this._url = configs.url;
    this._headers = configs.headers;
  }
  /*загрузка карточек с сервера*/
  getAllTasks() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this.#onResponse(response);
    });
  }

  /*полная информация при загрузке*/

  getAllInfo() {
    return Promise.all([this.getAllProfile(), this.getAllTasks()]);
  }

  /*добавление карточки на сервер*/
  addNewTasks(formItemObject) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(formItemObject),
    }).then((response) => {
      return this.#onResponse(response);
    });
  }
  /*Удаление карточки*/

  removeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => {
      return this.#onResponse(response);
    });
  }
  /*загрузка профиля ссервера*/
  getAllProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this.#onResponse(response);
    });
  }
  /*загрузка на сервер новых данных профиля*/

  addNewProfile(formItemObject) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formItemObject),
    }).then((response) => {
      return this.#onResponse(response);
    });
  }

  changeLike(idCard, isLike) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((response) => {
      return this.#onResponse(response);
    });
  }

  /*Смена аватарки*/

  addNewAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar.avatar }),
    }).then((response) => {
      return this.#onResponse(response);
    });
  }
}

const api = new Api(configs);

export default api;
