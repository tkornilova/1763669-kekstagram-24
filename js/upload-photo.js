import { showMessage, addHiddenClass, removeHiddenClass } from './utils.js';
import { sendData } from './api.js';
import { rescaleUploadPhoto } from './photo-editor.js';

const USER_COMMENT_LENGTH = 5;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const body = document.querySelector('body');
const changePhotoForm = document.querySelector('.img-upload__overlay');
const uploadButtonClose = document.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const userHashTag = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const effectLevel = document.querySelector('.effect-level');
const effectNone = document.querySelector('#effect-none');

const clearInputs = (inputA, inputB) => {
  inputA.value = '';
  inputB.value = '';
};

const closeForm = () => {
  uploadPhotoPreview.className = '';
  uploadPhotoPreview.classList.add('effects__preview--none');
  uploadPhotoPreview.style.cssText = '';
  addHiddenClass(effectLevel);
  addHiddenClass(changePhotoForm);
  clearInputs(userHashTag, userComment);
  body.classList.remove('modal-open');
  effectNone.checked = true;
  fileChooser.value = '';
  document.removeEventListener('keydown', onEscKeydown);
};

uploadButtonClose.addEventListener('click', (evt) => {
  closeForm(evt);
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    uploadPhotoPreview.src = URL.createObjectURL(file);
    removeHiddenClass(changePhotoForm);
    document.addEventListener('keydown', onEscKeydown);
    body.classList.add('modal-open');
  }
});

// FD для своевременного добавления/удаления обработчиков из-за правила еслинта no-use-before-define
function onEscKeydown(evt) {
  const activeElement = document.activeElement;
  const ifHashTagOrCommentInFocus = (activeElement === userHashTag) || (activeElement === userComment);

  if (evt.key === 'Escape' && !ifHashTagOrCommentInFocus) {
    closeForm(evt);
  }
}

export const validationUserHashTag = () => {
  const regex = /^#[\w]{1,19}$/;
  const userHashTags = userHashTag.value.split(' ');

  const userHashTagsLowerCase = userHashTags.map((value) => value.toLowerCase()).filter((el) => el !== '');
  const uniqueUserHashTags = _.uniq(userHashTagsLowerCase);

  switch (true) {
    case (userHashTag.value === ''):
      userHashTag.setCustomValidity('');
      break;
    case userHashTagsLowerCase.length > USER_COMMENT_LENGTH:
      userHashTag.setCustomValidity(`Количество хештегов не может быть больше ${  USER_COMMENT_LENGTH  }.`);
      break;
    case (!userHashTagsLowerCase.every((value) => value.match(regex)) || !userHashTagsLowerCase.textContent === ''):
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
      closeForm();
      showMessage('success'),
      rescaleUploadPhoto(100, uploadPhotoPreview);
    },
    () => {
      closeForm();
      showMessage('error');
    },
    new FormData(evt.target),
  );
});
