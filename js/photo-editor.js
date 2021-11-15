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

const filterType = {
  NONE: {
    name: 'none',
  },
  CHROME: {
    name: 'chrome',
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  SEPIA: {
    name: 'sepia',
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  MARVIN: {
    name: 'marvin',
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  PHOBOS: {
    name: 'phobos',
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  HEAT: {
    name: 'heat',
    effect: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
};

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);

  switch (true) {
    case evt.target.value === filterType.NONE.name:
      uploadPhotoPreview.style.cssText = '';
      addHiddenClass(effectLevel);
      break;
    case evt.target.value === filterType.CHROME.name:
      removeHiddenClass(effectLevel);
      filterState.current = filterType.CHROME.effect;
      changeSliderOptions(filterType.CHROME.min, filterType.CHROME.max, filterType.CHROME.step, filterType.CHROME.start);
      break;
    case evt.target.value === filterType.SEPIA.name:
      removeHiddenClass(effectLevel);
      filterState.current = filterType.SEPIA.effect;
      changeSliderOptions(filterType.SEPIA.min, filterType.SEPIA.max, filterType.SEPIA.step, filterType.SEPIA.start);
      break;
    case evt.target.value === filterType.MARVIN.name:
      removeHiddenClass(effectLevel);
      filterState.current = filterType.MARVIN.effect;
      changeSliderOptions(filterType.MARVIN.min, filterType.MARVIN.max, filterType.MARVIN.step, filterType.MARVIN.start);
      break;
    case evt.target.value === filterType.PHOBOS.name:
      removeHiddenClass(effectLevel);
      filterState.current = filterType.PHOBOS.effect;
      changeSliderOptions(filterType.PHOBOS.min, filterType.PHOBOS.max, filterType.PHOBOS.step, filterType.PHOBOS.start);
      break;
    case evt.target.value === filterType.HEAT.name:
      removeHiddenClass(effectLevel);
      filterState.current = filterType.HEAT.effect;
      changeSliderOptions(filterType.HEAT.min, filterType.HEAT.max, filterType.HEAT.step, filterType.HEAT.start);
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
