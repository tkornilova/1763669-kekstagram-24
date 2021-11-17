import { showSuccessMessage, showErrorMessage, addHiddenClass } from './utils.js';
import { sendData } from './api.js';
import { rescaleUploadPhoto } from './photo-editor.js';

const USER_COMMENT_LENGTH = 5;

const changePhotoForm = document.querySelector('.img-upload__overlay');
const uploadButtonClose = document.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const userHashTag = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const effectLevel = document.querySelector('.effect-level');
const effectNone = document.querySelector('#effect-none');
const body = document.querySelector('body');

const clearInputs = (inputA, inputB) => {
  inputA.value = '';
  inputB.value = '';
};


const closeForm = (evt) => {
  evt.preventDefault();
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add('effects__preview--none');
  uploadPhotoPreview.style.cssText = '';
  addHiddenClass(effectLevel);
  addHiddenClass(changePhotoForm);
  clearInputs(userHashTag, userComment);
  body.classList.remove('modal-open');
  effectNone.checked = true;
};

const ifFocus = 'userHashTag.hasFocus() || userComment.hasFocus()';

uploadButtonClose.addEventListener('click', (evt) => {
  closeForm(evt);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !ifFocus) {
    closeForm(evt);
  }
});

export const validationUserHashTag = () => {
  const regex = /^#[\w]{1,19}$/;
  const userHashTags = userHashTag.value.split(' ');

  const userHashTagsLowerCase = userHashTags.map((value) => value.toLowerCase());
  const uniqueUserHashTags = _.uniq(userHashTagsLowerCase);

  switch (true) {
    case userHashTagsLowerCase.length > USER_COMMENT_LENGTH:
      userHashTag.setCustomValidity(`Количество хештегов не может быть больше ${  USER_COMMENT_LENGTH  }.`);
      break;
    case !userHashTagsLowerCase.every((value) => value.match(regex)):
      userHashTag.setCustomValidity('Хештег должен начинаться с #. Минимальная длина хештега - 2, максимальная - 20. Хештег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи');
      break;
    case (!(userHashTagsLowerCase.length === uniqueUserHashTags.length)):
      userHashTag.setCustomValidity('Хештеги не могут повторяться.');
      break;
    default:
      userHashTag.setCustomValidity('');
      break;
  }

  userHashTag.reportValidity();
};

export const validationUserComment = () => {
  if (userComment.validity.tooLong) {
    userComment.setCustomValidity('Максимальная длинна комментария 140 символов.');
  }

  userComment.reportValidity();
};

uploadPhotoForm.addEventListener('change', () => {
  validationUserHashTag();
  validationUserComment();
});

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showSuccessMessage(),
      rescaleUploadPhoto(100, uploadPhotoPreview);
    },
    () => {
      showErrorMessage();
    },
    new FormData(evt.target),
  );

  closeForm(evt);
});
