import {photoDescriptions} from './data.js';

// Находим блок, куда будем вставлять шаблон
const userMiniatureElement = document.querySelector('.pictures');

// Находим шаблон
const userMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создаем массив, испозуя функцию написанную ранее
const userMiniatures = photoDescriptions;

// Создаем фрагмент, куда впишем все элементы массива
const userMiniaturesFragment = document.createDocumentFragment();

userMiniatures.forEach ((miniature) => {
  // Клонируем шаблон (miniatureElement - клон)
  const miniatureElement = userMiniatureTemplate.cloneNode(true);

  // Дбавляем SRC
  miniatureElement.querySelector('.picture__img').src = miniature.url;

  // Дбавляем комментарий
  miniatureElement.querySelector('.picture__comments').textContent = miniature.comments.length;

  // Дбавляем лайки
  miniatureElement.querySelector('.picture__likes').textContent = miniature.likes;

  // Добавляем созданный элемент в фрагмент
  userMiniaturesFragment.appendChild(miniatureElement);

});

// Добавляем фрагмент в разметку
userMiniatureElement.appendChild(userMiniaturesFragment);
