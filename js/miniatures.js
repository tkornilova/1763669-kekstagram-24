//import { photoDescriptions } from './data.js';
import { renderFullPicture } from './full-picture.js';

const userMiniatureElement = document.querySelector('.pictures');
const userMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userMiniaturesFragment = document.createDocumentFragment();

export const renderUserMiniatures = (photoDescriptions) => {
  const onCurrentMiniatureClick = (miniatureId) => {
    const currentMiniature = photoDescriptions.find((miniature) => miniature.id === miniatureId);
    renderFullPicture(currentMiniature);
  };

  photoDescriptions.forEach((miniature) => {
    const miniatureElement = userMiniatureTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').src = miniature.url;
    miniatureElement.querySelector('.picture__comments').textContent = miniature.comments.length;
    miniatureElement.querySelector('.picture__likes').textContent = miniature.likes;
    miniatureElement.addEventListener('click', () => onCurrentMiniatureClick(miniature.id));
    userMiniaturesFragment.appendChild(miniatureElement);
  });
};

userMiniatureElement.appendChild(userMiniaturesFragment);
