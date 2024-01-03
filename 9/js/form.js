import { isEscapeKey } from './util.js';
import '../vendor/pristine/pristine.min.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const uploadCloseButton = uploadForm.querySelector('#upload-cancel');

const DEFAULT_SCALE = 100;
const SCALE_CONTROL_STEP = 25;

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const INVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) => string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !INVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) => startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (value) => {
  const tags = value.split(' ');
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtags,
  validateHashtags,
  'Неправильно заполнены хэштеги'
);


const scaleImage = (value = DEFAULT_SCALE) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

function resetScale() {
  scaleImage(DEFAULT_SCALE);
}

function onSmallerScaleControlClick () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue > 25) {
    const newValue = currentValue - SCALE_CONTROL_STEP;
    scaleImage(newValue);
  }
}

function onBiggerScaleControlClick () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue !== 100) {
    const newValue = currentValue + SCALE_CONTROL_STEP;
    scaleImage(newValue);
  }
}

const isTextFieldFocused = () => document.activeElement === hashtags || document.activeElement === description;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  scaleControlSmaller.addEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.addEventListener('click', onBiggerScaleControlClick);
}

function closeUploadOverlay() {
  uploadForm.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  scaleControlSmaller.removeEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.removeEventListener('click', onBiggerScaleControlClick);
  resetScale();
}


uploadFile.addEventListener('change', openUploadOverlay);
uploadCloseButton.addEventListener('click', closeUploadOverlay);
