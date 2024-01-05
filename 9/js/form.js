import { onEscKeydown } from './util.js';
import { validateHashtags } from './validation.js';
import { onSmallerScaleControlClick, onBiggerScaleControlClick, scaleImage } from './edit-picture.js';
import '../vendor/pristine/pristine.min.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const hashtags = uploadForm.querySelector('.text__hashtags');
const uploadCloseButton = uploadForm.querySelector('#upload-cancel');

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

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  scaleControlSmaller.addEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.addEventListener('click', onBiggerScaleControlClick);
}

function closeUploadOverlay() {
  uploadForm.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  scaleControlSmaller.removeEventListener('click', onSmallerScaleControlClick);
  scaleControlBigger.removeEventListener('click', onBiggerScaleControlClick);
  scaleImage();
}


uploadFile.addEventListener('change', openUploadOverlay);
uploadCloseButton.addEventListener('click', closeUploadOverlay);
