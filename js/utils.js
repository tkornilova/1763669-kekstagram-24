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
