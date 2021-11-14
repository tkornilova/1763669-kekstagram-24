import { renderUserMiniatures } from './miniatures.js';
import './upload-photo.js';
import './photo-editor.js';
import { getData } from './api.js';

getData ((userData) => {
  renderUserMiniatures(userData);
});
