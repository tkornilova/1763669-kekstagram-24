const body = document.querySelector('body');

export const removeHiddenClass = (el) => {
  el.classList.remove('hidden');
};

export const addHiddenClass = (el) => {
  el.classList.add('hidden');
};

export const showMessage = (type) => {
  let messageTemplate;
  let closeButton;

  if (type === 'success') {
    messageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  } else if (type === 'error') {
    messageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  } else {
    return;
  }

  body.appendChild(messageTemplate);

  if (type === 'success') {
    closeButton = document.querySelector('.success__button');
  } else if (type === 'error') {
    closeButton = document.querySelector('.error__button');
  } else {
    return;
  }

  const removePopup = () => {
    messageTemplate.remove();
    body.classList.remove('modal-open');
  };

  // FD для своевременного добавления/удаления обработчиков из-за правила еслинта no-use-before-define
  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removePopup();

      document.removeEventListener('keydown', onEscKeydown);
      closeButton.removeEventListener('click', onButtonClick);
      document.removeEventListener('click', onDocumentClick);
    }
  }

  function onButtonClick(evt) {
    evt.preventDefault();
    removePopup();

    document.removeEventListener('keydown', onEscKeydown);
    closeButton.removeEventListener('click', onButtonClick);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentClick ()  {
    removePopup();

    document.removeEventListener('keydown', onEscKeydown);
    closeButton.removeEventListener('click', onButtonClick);
    document.removeEventListener('click', onDocumentClick);
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', onButtonClick);
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  const ALERT_SHOW_TIME = 5000;

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

