import { renderUserMiniatures } from './miniatures.js';
import { getData } from './api.js';

const RANDOM_PICTURES_NUMBER = 10;
const RERENDER_DELAY = 500;

const photoSorting = document.querySelector('.img-filters');
const photoSortingButtons = document.querySelectorAll('.img-filters__button');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

photoSorting.classList.remove('img-filters--inactive');

const sortDataDiscussed = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

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

    const onFilterClick = _.debounce(() => {
      removeFilterFromAll();
      addFilter(photoSortingButton);

      if (photoSortingButton.id === 'filter-default') {
        renderUserMiniatures(userData);
      }
      if (photoSortingButton.id === 'filter-random') {
        const randomPictures = _.uniqBy(userData, 'url')
          .slice(0, RANDOM_PICTURES_NUMBER);
        renderUserMiniatures(randomPictures);
      }
      if (photoSortingButton.id === 'filter-discussed') {
        const topMiniatures = userData
          .slice()
          .sort(sortDataDiscussed);
        renderUserMiniatures(topMiniatures);
      }
    }, RERENDER_DELAY);

    photoSortingButton.addEventListener('click', onFilterClick);
  });
});
