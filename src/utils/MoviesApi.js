import { MOVIES_URL } from "./constants";

const handleResponseValidation = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getAllMovies = () => {
  return fetch(MOVIES_URL + '/beatfilm-movies', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponseValidation(res));
}