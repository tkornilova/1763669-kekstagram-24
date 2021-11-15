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
