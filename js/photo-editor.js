import { scaleValueStep } from './data.js';
import './../nouislider/nouislider.js';
import { addHiddenClass, removeHiddenClass } from './utils.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsSliderContainer = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

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

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);

  switch (true) {
    case evt.target.value === 'none':
      uploadPhotoPreview.style.cssText = '';
      addHiddenClass(effectLevel);
      break;
    case evt.target.value === 'chrome':
      uploadPhotoPreview.style.cssText = '';
      removeHiddenClass(effectLevel);
      filterState.current = 'grayscale';
      changeSliderOptions(0, 1, 0.1, 1);
      break;
    case evt.target.value === 'sepia':
      uploadPhotoPreview.style.cssText = '';
      removeHiddenClass(effectLevel);
      filterState.current = 'sepia';
      changeSliderOptions(0, 1, 0.1, 1);
      break;
    case evt.target.value === 'marvin':
      uploadPhotoPreview.style.cssText = '';
      removeHiddenClass(effectLevel);
      filterState.current = 'invert';
      changeSliderOptions(0, 100, 1, 100);
      break;
    case evt.target.value === 'phobos':
      uploadPhotoPreview.style.cssText = '';
      removeHiddenClass(effectLevel);
      filterState.current = 'blur';
      changeSliderOptions(0, 3, 0.1, 3);
      break;
    case evt.target.value === 'heat':
      uploadPhotoPreview.style.cssText = '';
      removeHiddenClass(effectLevel);
      filterState.current = 'brightness';
      changeSliderOptions(0, 3, 0.1, 3);
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
