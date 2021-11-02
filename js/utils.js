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

// Открыть форму

export const openForm = (buttonName, formName) => {
  const body = document.querySelector('body');
  buttonName.addEventListener('click', () => {
    formName.classList.remove('hidden');
    body.classList.add('modal-open');
  });
};

// Закрыть форму по клику

export const closeFormWithClick = (buttonName, formName) => {
  const body = document.querySelector('body');
  buttonName.addEventListener('click', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    formName.classList.add('hidden');
    body.classList.remove('modal-open');
  });
};

// Закрыть форму с помощью ESC

export const closeFormWithEsc = (formName) => {
  const body = document.querySelector('body');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      evt.preventDefault();
      formName.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};
