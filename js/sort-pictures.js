import { renderUserMiniatures } from './miniatures.js';
import { getData } from './api.js';

const photoSorting = document.querySelector('.img-filters');
const photoSortingButtons = document.querySelectorAll('.img-filters__button');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

photoSorting.classList.remove('img-filters--inactive');

const sortDataDiscussed = (pictureA, pictureB) => pictureA.comments.length < pictureB.comments.length;

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
      removeFilterFromAll();
      addFilter(photoSortingButton);

      if (photoSortingButton.id === 'filter-default') {
        _.debounce(renderUserMiniatures(userData), RERENDER_DELAY);
      }
      if (photoSortingButton.id === 'filter-random') {
        const randomPictures = _.uniqBy(userData, 'url')
          .slice(0, RANDOM_PICTURES_NUMBER);
        _.debounce(renderUserMiniatures(randomPictures), RERENDER_DELAY);
      }
      if (photoSortingButton.id === 'filter-discussed') {
        const topMiniatures = userData
          .slice()
          .sort(sortDataDiscussed);
        _.debounce(renderUserMiniatures(topMiniatures), RERENDER_DELAY);
      }
    });
  });
});
