import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPictures } from './photo.js';
import './edit-picture.js';
import './form.js';

getData(renderPictures, showAlert);
