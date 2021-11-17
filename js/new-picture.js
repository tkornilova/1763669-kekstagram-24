import { removeHiddenClass } from './utils.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const uploadPhotoPreview = document.querySelector('.img-upload__preview img');
const body = document.querySelector('body');
const changePhotoForm = document.querySelector('.img-upload__overlay');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    uploadPhotoPreview.src = URL.createObjectURL(file);
    removeHiddenClass(changePhotoForm);
    body.classList.add('modal-open');
  }
});
