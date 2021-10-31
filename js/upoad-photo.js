import { openForm } from './utils.js';
import { closeFormWithEsc } from './utils.js';
import { closeFormWithClick } from './utils.js';

const changePhotoform = document.querySelector('.img-upload__overlay');

const uploadPhotoFormOpen = () => {
  const uploadPhotoInput = document.querySelector('#upload-file');
  openForm(uploadPhotoInput, changePhotoform);
};

const uploadPhotoFormClose = () => {
  const uploadButtonClose = document.querySelector('#upload-cancel');
  closeFormWithClick (uploadButtonClose, changePhotoform);
  closeFormWithEsc(changePhotoform);
};

uploadPhotoFormClose();
uploadPhotoFormOpen();

