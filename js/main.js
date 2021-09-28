// Выбор случайного числа от min до (max+1)
// Source: https://learn.javascript.ru/task/random-int-min-max

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


// Проверка длины комментария

function commentLength (userCommentLength, maxLength) {
  if (userCommentLength > maxLength) {
    return('Длина комментария превышает максимально допустимую длину');
  }
  return('Длина комментария не превышает максимально допустимую длину');
}

commentLength (30, 140);
