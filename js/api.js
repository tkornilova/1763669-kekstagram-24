const getDataLink = 'https://24.javascript.pages.academy/kekstagram/data';
const sendDataLink = 'https://24.javascript.pages.academy/kekstagram';

export const getData = (onSuccess) => {
  fetch(getDataLink)
    .then((response) => response.json())
    .then((userData) => {
      onSuccess(userData);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    sendDataLink,
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
