import { scaleValueStep } from './data.js';
import './../nouislider/nouislider.js';
import { addHiddenClass, removeHiddenClass } from './utils.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsSliderContainer = document.querySelector('.effect-level__slider');

const rescaleUploadPhoto = (value, el) => {
  el.style.cssText = `transform: scale(${value / 100})`;
};

buttonScaleSmaller.addEventListener('click', () => {
  if (!(scaleValue.value <= 25)) {
    scaleValue.value = scaleValue.value - scaleValueStep;
  } else {
    false;
  }

  rescaleUploadPhoto(scaleValue.value, uploadPhotoPreview);
});

buttonScaleBigger.addEventListener('click', () => {
  if (!(scaleValue.value >= 100)) {
    scaleValue.value = Number(scaleValue.value) + scaleValueStep;
  } else {
    false;
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

  addHiddenClass(effectsSliderContainer);
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

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);

  switch (true) {
    case evt.target.value === 'none':
      addHiddenClass(effectsSliderContainer);
      break;
    case evt.target.value === 'chrome':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 1, 0.1, 1);
      filterState.current = 'grayscale';
      break;
    case evt.target.value === 'sepia':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 1, 0.1, 1);
      filterState.current = 'sepia';
      break;
    case evt.target.value === 'marvin':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 100, 1, 100);
      filterState.current = 'invert';
      break;
    case evt.target.value === 'phobos':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 3, 0.1, 3);
      filterState.current = 'blur';
      break;
    case evt.target.value === 'heat':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 3, 0.1, 3);
      filterState.current = 'brightness';
      break;
  }
};

effectsSliderContainer.noUiSlider.on('update', (_, handle, undecoded) => {
  const updateEffectParameters = (units) => {
    uploadPhotoPreview.style.cssText = `filter: ${filterState.current}(${undecoded[handle]}${units})`;
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
