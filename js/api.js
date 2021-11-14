export const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data') // лучше вынести в константу
    .then((response) => response.json())
    .then((userData) => {
      onSuccess(userData);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram', // лучше вынести в константу
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
