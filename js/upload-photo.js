import { openForm } from './utils.js';
import { closeFormWithEsc } from './utils.js';
import { closeFormWithClick } from './utils.js';
import { USER_COMMENT_LENGTH } from './data.js';

const changePhotoform = document.querySelector('.img-upload__overlay');

const uploadPhotoInput = document.querySelector('#upload-file');
openForm(uploadPhotoInput, changePhotoform);

const uploadButtonClose = document.querySelector('#upload-cancel');
closeFormWithClick (uploadButtonClose, changePhotoform);
closeFormWithEsc(changePhotoform);

const userHashTagValidation = () => {
  const userHashTag = document.querySelector('.text__hashtags');
  const regex = /^#[\w]{1,19}$/;
  const userHashTags = userHashTag.value.split(' ');

  const userHashTagsLowerCase = userHashTags.map(((value) => {
    value.toLowerCase();
  }));

  if (userHashTagsLowerCase.length > 5) {
    userHashTag.setCustomValidity(`Количество хештегов не может быть больше ${  USER_COMMENT_LENGTH  }.`);
  }

  if (!userHashTagsLowerCase.includes(regex)) {
    userHashTag.setCustomValidity('Хештег должен начинаться с #. Минимальная длина хештега - 2, максимальная - 20. Хештег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи');
  }

  const uniqueUserHashTags = _.uniq(userHashTagsLowerCase);
  if (!userHashTagsLowerCase.length === uniqueUserHashTags.length) {
    userHashTag.setCustomValidity('Хештеги не могут повторяться.');
  }

  userHashTag.reportValidity();
};

const userCommentValidation = () => {
  const userComment = document.querySelector('text__description');
  if (userComment.validity.tooLong) {
    userComment.setCustomValidity('Максимальная длинна комментария 140 символов.');
  }

  userComment.reportValidity();
};

const uploadPhotoForm = document.querySelector('.img-upload__form');
uploadPhotoForm.addEventListener('change', (evt) => {
  userHashTagValidation();
  userCommentValidation();

  if (!uploadPhotoForm.validity.valid) {
    evt.preventDefault();
  }
});
