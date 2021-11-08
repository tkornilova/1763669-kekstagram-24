import { scaleValueStep } from './data.js';

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

buttonScaleSmaller.addEventListener('click', () => {
  if (!(scaleValue.value <= 25)) {
    scaleValue.value = scaleValue.value - scaleValueStep;
  } else {
    false;
  }
});

buttonScaleBigger.addEventListener('click', () => {
  if (!(scaleValue.value >= 100)) {
    scaleValue.value = Number(scaleValue.value) + scaleValueStep;
  } else {
    false;
  }
});
