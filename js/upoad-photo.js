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
  const userHashTags = userHashTag.value.split(' ', USER_COMMENT_LENGTH);

  const userHashTagsLowerCase = userHashTags.map(((_value, i) => {
    userHashTags[i].textContent.toLowerCase();
  }));

  if (userHashTagsLowerCase.length > 5) {
    userHashTag.setCustomValidity(`Количество хештегов не может быть больше ${  USER_COMMENT_LENGTH  }.`);
  }

  for (let i = 0; i < userHashTagsLowerCase.length; i++) {

    if (userHashTagsLowerCase[i].value.includes(regex)) {
      userHashTag.setCustomValidity('Хештег должен начинаться с #. Минимальная длина хертега - 2, максимальная - 20. Хештег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи');
    }

    for (let k = i + 1 ; k < userHashTagsLowerCase.length; k++) {
      if (userHashTagsLowerCase[i].textContent === userHashTagsLowerCase[k].textContent) {
        userHashTag.setCustomValidity('Хештеги не могут повторяться.');
      }
      k++;
    }
  }
  userHashTag.reportValidity();
};

userHashTagValidation();

const userCommentValidation = () => {
  const userComment = document.querySelector('text__description');
  if (userComment.validity.tooLong) {
    userComment.setCustomValidity('Максимальная длинна комментария 140 символов.');
  }

  userComment.reportValidity();
};

userCommentValidation();
