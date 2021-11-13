import { renderUserMiniatures } from './miniatures.js';
import './upload-photo.js';
import './photo-editor.js';

fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((userData) => {
    renderUserMiniatures(userData);
    console.log(userData);
  });
