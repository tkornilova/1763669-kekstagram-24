// Найти случайное число из диапазона

function randomIntegerNumber (min, max) {
  if (min < 0 || max < 0) {
    return('Минимальное и максимальные значения должны быть больше 0');
  }

  if (min >= max) {
    return('Минимальное значение должно быть меньше максимального');
  }

  const rand = min + Math.random() * (max + 1 - min);
  return(Math.floor(rand));
}

randomIntegerNumber(4, 15);

export {randomIntegerNumber};

// Сравнить длину комментария с заданной

function commentLength (userCommentLength, maxLength) {
  if (userCommentLength > maxLength) {
    return false;
  }
  return true;
}

commentLength (30, 140);

export {commentLength};
