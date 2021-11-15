const body = document.querySelector('body');

// Убрать класс hidden
export const removeHiddenClass = (el) => {
  el.classList.remove('hidden');
};

// Добавить класс hidden
export const addHiddenClass = (el) => {
  el.classList.add('hidden');
};

// Открыть форму
export const openForm = (buttonName, formName) => {
  buttonName.addEventListener('click', () => {
    removeHiddenClass(formName);
    body.classList.add('modal-open');
  });
};

// Закрыть форму по клику на кнопку-крестик
export const closeFormWithClick = (buttonName, formName) => {
  buttonName.addEventListener('click', (evt) => {
    evt.preventDefault();
    addHiddenClass(formName);
    body.classList.remove('modal-open');
  });
};

// Закрыть форму с помощью ESC
export const closeFormWithEsc = (formName) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      addHiddenClass(formName);
      body.classList.remove('modal-open');
    }
  });
};

// Закрыть форму по клику за пределы формы
const closeFormWithClickOut = (formName) => {
  document.addEventListener('click', () => {
    addHiddenClass(formName);
  });
};

export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');

  body.appendChild(successTemplate);

  const successMessageCloseButton = document.querySelector('.success__button');

  closeFormWithEsc(successMessageCloseButton, successTemplate);
  closeFormWithClick(successMessageCloseButton, successTemplate);
  closeFormWithClickOut(successTemplate);
};

export const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');

  body.appendChild(errorTemplate);

  const errorMessageCloseButton = document.querySelector('.error__button');

  closeFormWithEsc(errorMessageCloseButton, errorTemplate);
  closeFormWithClick(errorMessageCloseButton, errorTemplate);
  closeFormWithClickOut(errorTemplate);
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
}
