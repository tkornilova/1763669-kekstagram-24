import {
  openForm,
  closeFormWithClick,
  showSuccessMessage,
  showErrorMessage,
  addHiddenClass
} from './utils.js';

import { sendData } from './api.js';
import { rescaleUploadPhoto } from './photo-editor.js';

const changePhotoForm = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('#upload-file');
const uploadButtonClose = document.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const userHashTag = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const body = document.querySelector('body');

const USER_COMMENT_LENGTH = 5;

const clearInputs = (inputA, inputB) => {
  inputA.value = '';
  inputB.value = '';
};

openForm(uploadPhotoInput, changePhotoForm);

closeFormWithClick (uploadButtonClose, changePhotoForm);

const ifFocus = 'userHashTag.hasFocus() || userComment.hasFocus()';

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !ifFocus) {
    evt.preventDefault();
    addHiddenClass(changePhotoForm);
    body.classList.remove('modal-open');
    clearInputs(userHashTag, userComment);
  }
});

const validationUserHashTag = () => {
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

const validationUserComment = () => {
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
      addHiddenClass(changePhotoForm);
      showSuccessMessage(),
      rescaleUploadPhoto(100, uploadPhotoPreview);
      uploadPhotoPreview.classList.add('effects__preview--none');
    },
    () => {
      addHiddenClass(changePhotoForm);
      showErrorMessage();
    },
    new FormData(evt.target),
  );

  clearInputs(userHashTag, userComment);
});
