import { showAlert } from './utils.js';

const GET_DATA_LINK = 'https://24.javascript.pages.academy/kekstagram/data';
const SEND_DATA_LINK = 'https://24.javascript.pages.academy/kekstagram';

export const getData = (onSuccess) => {
  fetch(GET_DATA_LINK)
    .then((response) => response.json())
    .then((userData) => {
      onSuccess(userData);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте еще раз.');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
