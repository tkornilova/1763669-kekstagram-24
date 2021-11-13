import {
  openForm,
  closeFormWithClick,
  closeFormWithEsc,
  showSuccessMessage,
  showErrorMessage
} from './utils.js';

import { sendData } from './api.js';

const changePhotoform = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('#upload-file');
const uploadButtonClose = document.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const uploadPhotoButtonSubmit = document.querySelector('.img-upload__submit');
const USER_COMMENT_LENGTH = 5;

openForm(uploadPhotoInput, changePhotoform);

closeFormWithClick (uploadButtonClose, changePhotoform);

closeFormWithEsc(changePhotoform);

const userHashTagValidation = () => {
  const userHashTag = document.querySelector('.text__hashtags');
  const regex = /^#[\w]{1,19}$/;
  const userHashTags = userHashTag.value.split(' ');

  const userHashTagsLowerCase = userHashTags.map((value) => value.toLowerCase());
  const uniqueUserHashTags = _.uniq(userHashTagsLowerCase);

  switch (true) {
    case userHashTagsLowerCase.length > 5:
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

const userCommentValidation = () => {
  const userComment = document.querySelector('.text__description');
  if (userComment.validity.tooLong) {
    userComment.setCustomValidity('Максимальная длинна комментария 140 символов.');
  }

  userComment.reportValidity();
};

uploadPhotoForm.addEventListener('change', () => {
  userHashTagValidation();
  userCommentValidation();
});

export const setUploadFormSubmit = () => {
  uploadPhotoButtonSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};
