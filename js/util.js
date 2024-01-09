const getRandomPositiveInteger = (a , b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const onEscKeydown = (evt, action) => {
  const textFields = ['INPUT', 'TEXTAREA'];
  if (isEscapeKey(evt) && !textFields.includes(evt.target.tagName)) {
    evt.preventDefault();
    action();
  }
};

export { getRandomPositiveInteger, getRandomArrayElement, onEscKeydown};
