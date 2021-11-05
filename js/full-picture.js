import { closeFormWithEsc } from './utils.js';
import { closeFormWithClick } from './utils.js';
import { removeHiddenClass } from './utils.js';

const fullPicture = document.querySelector('.big-picture');

// Закрывание full picture с помощью ESC
const buttonClose = document.querySelector('.big-picture__cancel');

closeFormWithClick(buttonClose, fullPicture);
closeFormWithEsc(fullPicture);

// Создать комментарий и вствить в разметку
const addComment = (comments) => {
  const userCommentsList = document.querySelector('.social__comments');
  const userCommentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const userCommentsFragment = document.createDocumentFragment();

  comments.forEach ((comment) => {
    const userCommentElement = userCommentsTemplate.cloneNode(true);
    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;
    userCommentsFragment.appendChild(userCommentElement);
  });

  userCommentsList.appendChild(userCommentsFragment);
};

// Добавить элементы к full picture
export const renderFullPicture = (picture) => {
  fullPicture.querySelector('.big-picture__img img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.comments-count').textContent = picture.comments.length;
  fullPicture.querySelector('.social__caption').textContent = picture.description;
  addComment(picture.comments);

  // Скрыть счетчик комментариев и загрузку новых комментариев, остановить скролл
  const commentCounter = document.querySelector('.social__comment-count');
  removeHiddenClass(commentCounter);

  const commentLoader = document.querySelector('.comments-loader');
  removeHiddenClass(commentLoader);

  removeHiddenClass(fullPicture);

  const showComments = (commentsArray) => {
    commentLoader.addEventListener('click', () => {
      for (let i = 0; i < commentsArray.length; i += 5) {
        commentsArray.slice(0, i + 5);
      }
    });
  };
};
