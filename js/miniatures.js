import { photoDescriptions } from './data.js';

const userMiniatureElement = document.querySelector('.pictures');
const userMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userMiniatures = photoDescriptions;
const userMiniaturesFragment = document.createDocumentFragment();

userMiniatures.forEach ((miniature) => {
  const miniatureElement = userMiniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = miniature.url;
  miniatureElement.querySelector('.picture__comments').textContent = miniature.comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = miniature.likes;
  userMiniaturesFragment.appendChild(miniatureElement);
});

userMiniatureElement.appendChild(userMiniaturesFragment);
