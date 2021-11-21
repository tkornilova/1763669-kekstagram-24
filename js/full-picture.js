import { addHiddenClass, removeHiddenClass } from './utils.js';

const fullPicture = document.querySelector('.big-picture');
const userCommentsList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.comments-loader');
const commentCounter = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const buttonClose = document.querySelector('.big-picture__cancel');

const closeForm = () => {
  addHiddenClass(fullPicture);
  body.classList.remove('modal-open');
  userCommentsList.innerHTML = '';
  addHiddenClass(commentLoader);
  document.removeEventListener('keydown', onEscKeydown);
};

buttonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

const addComment = (comments) => {
  const userCommentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const userCommentsFragment = document.createDocumentFragment();

  userCommentsList.innerHTML = '';

  comments.forEach ((comment) => {
    const userCommentElement = userCommentsTemplate.cloneNode(true);
    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;
    userCommentsFragment.appendChild(userCommentElement);
  });

  userCommentsList.appendChild(userCommentsFragment);
};

let renderComments = [];

const showComments = (commentsArray) => {
  renderComments = commentsArray.slice(0, 5);
  addComment(renderComments);

  const uploadedComments = document.querySelector('.comment-count-uploaded');
  uploadedComments.textContent = renderComments.length;

  commentLoader.addEventListener('click', () => {
    renderComments = commentsArray.slice(0, renderComments.length + 5);
    addComment(renderComments);

    if (renderComments.length === commentsArray.length) {
      addHiddenClass(commentLoader);
    }

    uploadedComments.textContent = renderComments.length;
  });

};

export const renderFullPictureForm = (picture) => {
  fullPicture.querySelector('.big-picture__img img').src = picture.url;
  fullPicture.querySelector('.likes-count').textContent = picture.likes;
  fullPicture.querySelector('.comments-count').textContent = picture.comments.length;
  fullPicture.querySelector('.social__caption').textContent = picture.description;
  showComments(picture.comments);

  removeHiddenClass(commentCounter);

  if (picture.comments.length > 5) {
    removeHiddenClass(commentLoader);
  }

  removeHiddenClass(fullPicture);
  document.addEventListener('keydown', onEscKeydown);
};
