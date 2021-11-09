import { scaleValueStep } from './data.js';
import './../nouislider/nouislider.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectsSliderContainer = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

const rescaleUploadPhoto = (value, el) => {
  const photoTransformation = `transform: scale(${value / 100})`;
  el.style.cssText = photoTransformation;
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

const createSlider = (minValue, maxValue, stepValue, startValue) => {
  noUiSlider.create(effectsSliderContainer, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });
};

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);

  switch (true) {
    case evt.target.value === 'none':
      effectsSliderContainer.noUiSlider.destroy();
      break;
    case evt.target.value === 'chrome':
      createSlider(0, 1, 0.1, 1);
      uploadPhotoPreview.style.filter = `grayscale(${evt.target.value})`;
      break;
    case evt.target.value === 'sepia':
      createSlider(0, 1, 0.1, 1);
      uploadPhotoPreview.style.filter = `sepia(${evt.target.value})`;
      break;
    case evt.target.value === 'marvin':
      createSlider(0, 100, 1, 100);
      uploadPhotoPreview.style.filter = `invert(${evt.target.value}%)`;
      break;
    case evt.target.value === 'phobos':
      createSlider(0, 3, 0.1, 3);
      uploadPhotoPreview.style.filter = `blur(${evt.target.value}px)`;
      break;
    case evt.target.value === 'heat':
      createSlider(0, 3, 0.1, 3);
      uploadPhotoPreview.style.filter = `brightness(${evt.target.value})`;
      break;
  }

  if (!(evt.target.value === 'none')) {
    effectsSliderContainer.noUiSlider.on('update', (_, handle, undecoded) => {
      effectLevel.value = undecoded[handle];
    });
  }
};

effectsList.addEventListener('change', onEffectsChange);
