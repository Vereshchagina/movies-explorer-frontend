import { BASE_URL, MOVIES_URL } from "./constants";

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponseValidation(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

  updateUserInfo(data, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._handleResponseValidation);
  }

  getSavedMovies(token) {
    return fetch(this._baseUrl + '/movies', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }

  addMovie(data, token) {
    return fetch(this._baseUrl + '/movies', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: MOVIES_URL + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: MOVIES_URL + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRu: data.nameRU,
        nameEN: data.nameEn
      }),
    }).then(this._handleResponseValidation);
  }

  deleteMovie(id, token) {
    return fetch(this._baseUrl + `/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._handleResponseValidation);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export default mainApi;