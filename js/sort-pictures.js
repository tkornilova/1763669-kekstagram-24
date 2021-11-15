import { renderUserMiniatures } from './miniatures.js';
import { getData } from './api.js';

const photoSorting = document.querySelector('.img-filters');
const photoSortingButtons = document.querySelectorAll('.img-filters__button');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const RANDOM_PICTURES_NUMBER = 10;

photoSorting.classList.remove('img-filters--inactive');

const sortDataDiscussed = (pictureA, pictureB) => {
  if (pictureA.comments.length < pictureB.comments.length) {
    return 1;
  } else {
    return -1;
  }
};

const sortDataRandom = (data) => {
  (renderUserMiniatures(data)); //Не знаю как именно выбрать, чтобы были именно РАЗНЫЕ картинки

};

const removeFilterFromAll = () => {
  filterButtonDefault.classList.remove('img-filters__button--active');
  filterButtonRandom.classList.remove('img-filters__button--active');
  filterButtonDiscussed.classList.remove('img-filters__button--active');
};

const addFilter = (buttonName) => {
  buttonName.classList.add('img-filters__button--active');
};

getData ((userData) => {
  renderUserMiniatures(userData);

  photoSortingButtons.forEach ((photoSortingButton) => {
    photoSortingButton.addEventListener('click', () => {
      if (photoSortingButton.id === 'filter-default') {
        removeFilterFromAll();
        addFilter(photoSortingButton);
        renderUserMiniatures(userData);
      }
      if (photoSortingButton.id === 'filter-random') {
        removeFilterFromAll();
        addFilter(photoSortingButton);
        userData
          .sort(sortDataRandom)
          .slice(0, RANDOM_PICTURES_NUMBER);
      }
      if (photoSortingButton.id === 'filter-discussed') {
        removeFilterFromAll();
        addFilter(photoSortingButton);
        userData
          .sort(sortDataDiscussed);
      }
    });
  });
});
