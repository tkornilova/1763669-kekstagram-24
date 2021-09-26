// Выбор случайного числа от min до (max+1)
// Source: https://learn.javascript.ru/task/random-int-min-max

function randomIntegerNumber (min, max) {
  if (min < 0 || max < 0) {
    console.log('Минимальное и максимальные значения должны быть больше 0');
    return;
  }

  if (min > max) {
    console.log('Минимальное значение должно быть меньше максимального');
    return;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

randomIntegerNumber(4, 15);


// Проверка длины комментария

const maxLength = 140;
let userCommentLength;
let strokeNumber;

function commentLength (strokeNumber, maxLength) {
  if (maxLength > userCommentLength) {
    console.log('Длина комментария превышает максимально допустимую длину');
  }
}

commentLength (5, 40);
