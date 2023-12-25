import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const pictures = document.querySelectorAll('.picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const onPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEscKeydown);
}

pictures.forEach((picture) => {
  picture.addEventListener('click', () => {
    bigPictureImage.src = picture.querySelector('.picture__img').src;
    likesCount.textContent = picture.querySelector('.picture__likes').textContent;
    commentsCount.textContent = picture.querySelector('.picture__comments').textContent;
    openBigPicture();
  });
});

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});
