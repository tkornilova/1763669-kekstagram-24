import {photoDescriptions} from './data.js';

// Открыть full picture
const fullPicture = document.querySelector('.big-picture');
fullPicture.classList.remove('hidden');

// Добавить элементы к full picture
photoDescriptions.forEach ((picture) => {
  fullPicture.querySelector('.big-picture__img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.comments-count').textContent = picture.comments.length;
  fullPicture.querySelector('.social__caption').textContent = picture.description;
});

// Скрыть счетчик комментариев и загрузку новых комментариев, остановить скролл
const commentCount = fullPicture.querySelector('.social__comment-count');
commentCount.classList.add('hidden');

const newCommentAdding = fullPicture.querySelector('.comments-loader');
newCommentAdding.classList.add('hidden');

const body = document.querySelector('body');
body.classList.add('modal-open');


// Закрывание full picture с помощью ESC
document.addEventListener('keypress', (evt) => {
  if (evt.keyCode === 27) {
    fullPicture.classList.add('hidden');
  }
});
