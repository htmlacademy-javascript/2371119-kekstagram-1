import { sendData } from './api.js';
import { onEscKeydown, appendFragment } from './util.js';
import { validateHashtags } from './validation.js';
import { onSmallerScaleControlClick, onBiggerScaleControlClick, scaleImage, updateSlider, onFormChange } from './edit-picture.js';
import '../vendor/pristine/pristine.min.js';

const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const hashtags = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadCloseButton = uploadForm.querySelector('#upload-cancel');

const onOuterErrorClick = (evt) => {
  if (evt.target.className !== 'error__inner') {
    closeErrorMessage();
  }
};

const onErrorEscKeydown = (evt) => {
  onEscKeydown(evt, closeErrorMessage);
};

const errorMessage = () => {
  appendFragment(errorTemplate);
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onOuterErrorClick);
};

const onOuterSuccessClick = (evt) => {
  if (evt.target.className !== 'success__inner') {
    closeSuccessMessage();
  }
};

const onSuccessEscKeyDown = (evt) => {
  onEscKeydown(evt, closeSuccessMessage);
};

const successMessage = () => {
  appendFragment(successTemplate);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessEscKeyDown);
  document.addEventListener('click', onOuterSuccessClick);
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(
  hashtags,
  validateHashtags,
  'Неправильно заполнены хэштеги'
);

const onUploadEscKeydown = (evt) => {
  onEscKeydown(evt, closeUploadOverlay);
};

const onSendDataSuccess = () => {
  closeUploadOverlay();
  successMessage();
};

const onSendDataError = () => {
  document.removeEventListener('keydown', onUploadEscKeydown);
  errorMessage();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    sendData (onSendDataSuccess, onSendDataError, new FormData(uploadForm));
    submitButton.disabled = false;
  }
};

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  scaleControlSmaller.addEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.addEventListener('click', onBiggerScaleControlClick);
  uploadForm.addEventListener('change', onFormChange);
  uploadForm.addEventListener('submit', onFormSubmit);
  uploadCloseButton.addEventListener('click', closeUploadOverlay);
}

function closeUploadOverlay() {
  uploadForm.reset();
  updateSlider();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  scaleControlSmaller.removeEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.removeEventListener('click', onBiggerScaleControlClick);
  uploadForm.removeEventListener('change', onFormChange);
  uploadForm.removeEventListener('submit', onFormSubmit);
  uploadCloseButton.removeEventListener('click', closeUploadOverlay);
  scaleImage();
}

function closeSuccessMessage () {
  document.querySelector('.success').remove();
  successButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOuterSuccessClick);
}

function closeErrorMessage () {
  document.querySelector('.error').remove();
  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onUploadEscKeydown);
  document.removeEventListener('click', onOuterErrorClick);
}

uploadFile.addEventListener('change', openUploadOverlay);
