import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const description = bigPicture.querySelector('.social__caption');
const loadMore = bigPicture.querySelector('.comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const onPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  loadMore.classList.add('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  loadMore.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureEscKeydown);
}

const getTemplateComment = ({avatar, message, name}) => {
  const commentTemplate =
  `<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`;
  return commentTemplate;
};

const renderComments = (arrComments) => {
  const commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  arrComments.forEach((commentElement) => {
    const comment = getTemplateComment(commentElement);
    commentsList.innerHTML += comment;
  });
};

export function generateBigPicture (arrPictures) {
  pictures.addEventListener('click', (evt) => {
    const currentEl = evt.target.closest('[data-thumbnail-id]');

    if (!currentEl) {
      return;
    }

    const elPicture = arrPictures.find((item) => item.id === Number(currentEl.dataset.thumbnailId));

    bigPictureImage.src = elPicture.url;
    likesCount.textContent = elPicture.likes;
    commentsCount.textContent = elPicture.comments.length;
    description.textContent = elPicture.description;

    renderComments(elPicture.comments);
    openBigPicture();
  });
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});
