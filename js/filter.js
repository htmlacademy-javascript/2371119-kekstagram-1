import { renderPictures } from './photo.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');

const filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = filter.DEFAULT;
let pictures = [];

const turnFilterOn = (posts) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...posts];
};

const randomSort = () => Math.random() - 0.5;

const discussedSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterPictures = () => {
  switch (currentFilter) {
    case filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, 10);
    case filter.DISCUSSED:
      return [...pictures].sort(discussedSort);
    default:
      return [...pictures];
  }
};

const debouncedRenderPictures = debounce(renderPictures);

filtersElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  if (evt.target.id === currentFilter) {
    return;
  }
  filtersElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  currentFilter = evt.target.id;
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  debouncedRenderPictures(filterPictures());
});

export { turnFilterOn };
