import { generateBigPicture } from './big-picture.js';

export function renderPictures(formPictures) {
  const picturesListFragment = document.createDocumentFragment();
  const picturesList = document.querySelector('.pictures');
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  formPictures.forEach(({url, likes, comments, id}) => {
    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.dataset.thumbnailId = id;
    picturesListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(picturesListFragment);

  generateBigPicture(formPictures);
}
