import { onEscKeydown } from './util.js';

const bodyElement = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const description = bigPicture.querySelector('.social__caption');
const loadMore = bigPicture.querySelector('.comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const COMMENTS_STEP = 5;
let commentsShown = 0;
let comments = [];

const onPictureEscKeydown = (evt) => {
  onEscKeydown(evt, closeBigPicture);
};

const getTemplateComment = ({avatar, message, name}) => {
  const commentTemplate =
  `<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`;
  return commentTemplate;
};

const renderComments = (arrComments) => {
  commentsShown += COMMENTS_STEP;
  commentsList.innerHTML = '';

  if (commentsShown >= arrComments.length) {
    loadMore.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    loadMore.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const comment = getTemplateComment(arrComments[i]);
    commentsList.innerHTML += comment;
  }

  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${arrComments.length}</span> комментариев`;
};

const onCommentsLoadMore = () => {
  renderComments(comments);
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
    description.textContent = elPicture.description;

    comments = elPicture.comments;

    renderComments(comments);
    openBigPicture();
  });
}

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  loadMore.addEventListener('click', onCommentsLoadMore);
  document.addEventListener('keydown', onPictureEscKeydown);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureEscKeydown);
  loadMore.removeEventListener('click', onCommentsLoadMore);
  commentsShown = 0;
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
}
