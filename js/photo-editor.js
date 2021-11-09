import { scaleValueStep } from './data.js';
import './../nouislider/nouislider.js';
import { addHiddenClass, removeHiddenClass } from './utils.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsSliderContainer = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

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

const changeEffectLevel = (value, effect) => {
  uploadPhotoPreview.style.cssText = `filter: ${ String(effect) }(${value})`;
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
      changeEffectLevel(evt.target.value, 'grayscale');
      break;
    case evt.target.value === 'sepia':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 1, 0.1, 1);
      changeEffectLevel(evt.target.value, 'sepia');
      break;
    case evt.target.value === 'marvin':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 100, 1, 100);
      changeEffectLevel(evt.target.value, 'invert');
      break;
    case evt.target.value === 'phobos':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 3, 0.1, 3);
      changeEffectLevel(evt.target.value, 'blur');
      break;
    case evt.target.value === 'heat':
      removeHiddenClass(effectsSliderContainer);
      changeSliderOptions(0, 3, 0.1, 3);
      changeEffectLevel(evt.target.value, 'brightness');
      break;
  }

  if (evt.target.value !== 'none') {
    effectsSliderContainer.noUiSlider.on('update', (_, handle, undecoded) => {
      effectLevel.value = undecoded[handle];
    });
  }
};

effectsList.addEventListener('change', onEffectsChange);
