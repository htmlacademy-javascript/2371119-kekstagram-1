import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPictures } from './photo.js';
import './edit-picture.js';
import './form.js';
import { turnFilterOn } from './filter.js';

getData(renderPictures, turnFilterOn, showAlert);
