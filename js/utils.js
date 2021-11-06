// Найти случайное число из диапазона
export const getRandomIntegerNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return('Минимальное и максимальные значения должны быть больше 0');
  }

  if (min >= max) {
    return('Минимальное значение должно быть меньше максимального');
  }

  const rand = min + Math.random() * (max + 1 - min);
  return(Math.floor(rand));
};

// Сравнить длину комментария с заданной
export const compareCommentLength = (userCommentLength, maxLength) => {
  if (userCommentLength > maxLength) {
    return false;
  }
  return true;
};

export const removeHiddenClass = (el) => {
  el.classList.remove('hidden');
};

export const addHiddenClass = (el) => {
  el.classList.add('hidden');
};

// Открыть форму
export const openForm = (buttonName, formName) => {
  const body = document.querySelector('body');
  buttonName.addEventListener('click', () => {
    removeHiddenClass(formName);
    body.classList.add('modal-open');
  });
};

// Закрыть форму по клику
export const closeFormWithClick = (buttonName, formName) => {
  const body = document.querySelector('body');
  buttonName.addEventListener('click', (evt) => {
    evt.preventDefault();
    addHiddenClass(formName);
    body.classList.remove('modal-open');
  });
};

// Закрыть форму с помощью ESC
export const closeFormWithEsc = (formName, elForReset = '', withReset = false) => {
  const body = document.querySelector('body');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      addHiddenClass(formName);
      body.classList.remove('modal-open');

      if (withReset) {
        elForReset.innerHTML = '';
      }
    }
  });
};
