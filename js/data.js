import { getRandomPositiveInteger } from './util.js';
import { getRandomArrayElement } from './util.js';

const IDs = [];
const URLs = [];
const PHOTOS_COUNT = 25;
const descriptions = [
  'Новая машина!',
  'С друзьями на море',
  'На концерте',
  'На экскурсии',
  'Необычное блюдо'
];

const comments = [
  'Вау!',
  'Вот это да!',
  'Классная машина',
  'Выглядишь отлично',
  'Ничего себе!'
];

const names = [
  'Артем',
  'Алексей',
  'Александр',
  'Борис',
  'Григорий'
];


const createID = () => {
  const id = getRandomPositiveInteger(1, 25);
  if (IDs.includes(id)) {
    return createID();
  } else {
    IDs.push(id);
    return id;
  }
};

const createURL = () => {
  const url = getRandomPositiveInteger(1, 25);
  if (URLs.includes(url)) {
    return createURL();
  } else {
    URLs.push(url);
    return url;
  }
};

const createComment = () => {
  const commentIDs = [];
  const avatars = [];

  const createCommentID = () => {
    const commentID = getRandomPositiveInteger(1, 1000);
    if (commentIDs.includes(commentID)) {
      return createCommentID();
    } else {
      commentIDs.push(commentID);
      return commentID;
    }
  };

  const createAvatar = () => {
    const avatar = getRandomPositiveInteger(1, 6);
    if (avatars.includes(avatar)) {
      return createAvatar();
    } else {
      avatars.push(avatar);
      return avatar;
    }
  };
  return {
    id: createCommentID(),
    avatar: `img/avatar${createAvatar()}.svg`,
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names),
  };
};

function createPhoto () {
  return {
    id: createID(),
    url: `photos/${createURL()}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(5, 10)}, createComment),
  };
}

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhoto);

export {createPhotos};
