import './../nouislider/nouislider.js';
import { addHiddenClass, removeHiddenClass } from './utils.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsSliderContainer = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

const SCALE_VALUE_STEP = 25;

export const rescaleUploadPhoto = (value, el) => {
  el.style.cssText = `transform: scale(${value / 100})`;
};

buttonScaleSmaller.addEventListener('click', () => {
  if (!(scaleValue.value <= 25)) {
    scaleValue.value = scaleValue.value - SCALE_VALUE_STEP;
  }

  rescaleUploadPhoto(scaleValue.value, uploadPhotoPreview);
});

buttonScaleBigger.addEventListener('click', () => {
  if (!(scaleValue.value >= 100)) {
    scaleValue.value = Number(scaleValue.value) + SCALE_VALUE_STEP;
  }

  rescaleUploadPhoto(Number(scaleValue.value), uploadPhotoPreview);
});

const createSlider = () => {
  noUiSlider.create(effectsSliderContainer, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });

  addHiddenClass(effectLevel);
};

createSlider();

const changeSliderOptions = (minValue, maxValue, stepValue, startValue) => {
  effectsSliderContainer.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });
};

const filterState = {
  current: 'none',
};

const FilterType = {
  NONE: {
    NAME: 'none',
  },
  CHROME: {
    NAME: 'chrome',
    EFFECT: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
  },
  SEPIA: {
    NAME: 'sepia',
    EFFECT: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
  },
  MARVIN: {
    NAME: 'marvin',
    EFFECT: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    START: 100,
  },
  PHOBOS: {
    NAME: 'phobos',
    EFFECT: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    START: 3,
  },
  HEAT: {
    NAME: 'heat',
    EFFECT: 'brightness',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    START: 3,
  },
};

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);

  switch (true) {
    case evt.target.value === FilterType.NONE.NAME:
      uploadPhotoPreview.style.cssText = '';
      addHiddenClass(effectLevel);
      break;
    case evt.target.value === FilterType.CHROME.NAME:
      removeHiddenClass(effectLevel);
      filterState.current = FilterType.CHROME.EFFECT;
      changeSliderOptions(FilterType.CHROME.MIN, FilterType.CHROME.MAX, FilterType.CHROME.STEP, FilterType.CHROME.START);
      break;
    case evt.target.value === FilterType.SEPIA.NAME:
      removeHiddenClass(effectLevel);
      filterState.current = FilterType.SEPIA.EFFECT;
      changeSliderOptions(FilterType.SEPIA.MIN, FilterType.SEPIA.MAX, FilterType.SEPIA.STEP, FilterType.SEPIA.START);
      break;
    case evt.target.value === FilterType.MARVIN.NAME:
      removeHiddenClass(effectLevel);
      filterState.current = FilterType.MARVIN.EFFECT;
      changeSliderOptions(FilterType.MARVIN.MIN, FilterType.MARVIN.MAX, FilterType.MARVIN.STEP, FilterType.MARVIN.START);
      break;
    case evt.target.value === FilterType.PHOBOS.NAME:
      removeHiddenClass(effectLevel);
      filterState.current = FilterType.PHOBOS.EFFECT;
      changeSliderOptions(FilterType.PHOBOS.MIN, FilterType.PHOBOS.MAX, FilterType.PHOBOS.STEP, FilterType.PHOBOS.START);
      break;
    case evt.target.value === FilterType.HEAT.NAME:
      removeHiddenClass(effectLevel);
      filterState.current = FilterType.HEAT.EFFECT;
      changeSliderOptions(FilterType.HEAT.MIN, FilterType.HEAT.MAX, FilterType.HEAT.STEP, FilterType.HEAT.START);
      break;
  }
};

effectsSliderContainer.noUiSlider.on('update', (_, handle, undecoded) => {
  const updateEffectParameters = (units) => {
    effectLevel.value = undecoded[handle];
    uploadPhotoPreview.style.cssText = `filter: ${filterState.current}(${effectLevel.value}${units})`;
  };

  switch (true) {
    case filterState.current === 'grayscale':
      updateEffectParameters('');
      break;
    case filterState.current === 'sepia':
      updateEffectParameters('');
      break;
    case filterState.current === 'invert':
      updateEffectParameters('%');
      break;
    case filterState.current === 'blur':
      updateEffectParameters('px');
      break;
    case filterState.current === 'brightness':
      updateEffectParameters('');
      break;
  }
});

effectsList.addEventListener('change', onEffectsChange);
