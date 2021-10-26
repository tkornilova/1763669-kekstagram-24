import {photoDescriptions} from './data.js';
import {comments} from './data.js';

const fullPicture = document.querySelector('.big-picture');

// Открытие окна full picture
fullPicture.classList.remove('hidden');

// Закрывание full picture с помощью ESC
const body = document.querySelector('body');
const buttonClose = document.querySelector('.big-picture__cancel');

buttonClose.addEventListener('click', () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    fullPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

// Создать комментарий и вствить в разметку
const userCommentsList = document.querySelector('.social__comments');
const userCommentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const userCommentsFragment = document.createDocumentFragment();

const addComment = comments.forEach ((comment) => {
  const userCommentElement = userCommentsTemplate.cloneNode(true);
  userCommentsTemplate.querySelector('.social__picture').src = comment.avatar;
  userCommentsTemplate.querySelector('.social__picture').alt = comment.name;
  userCommentsTemplate.querySelector('.social__text').textContent = comment.message;
  userCommentsFragment.appendChild(userCommentElement);
});

userCommentsList.appendChild(userCommentsFragment);

// Добавить элементы к full picture
photoDescriptions.forEach ((picture) => {
  fullPicture.querySelector('.big-picture__img img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.comments-count').textContent = picture.comments.length;
  fullPicture.querySelector('.social__caption').textContent = picture.description;
  addComment();
});

// Скрыть счетчик комментариев и загрузку новых комментариев, остановить скролл
const commentCount = fullPicture.querySelector('.social__comment-count');
commentCount.classList.add('hidden');

const newCommentAdding = fullPicture.querySelector('.comments-loader');
newCommentAdding.classList.add('hidden');
