import { scaleValueStep } from './data.js';
import './../nouislider/nouislider.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

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

const onEffectsChange = (evt) => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add(`effects__preview--${evt.target.value}`);
};

effectsList.addEventListener('change', onEffectsChange);
