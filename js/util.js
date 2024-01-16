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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 10px 3px;
    font-size: 30px;
    text-align: center;
    background-color: red;
  `;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const appendFragment = (template) => {
  const fragment = document.createDocumentFragment();
  fragment.append(template);
  document.body.append(fragment);
};

export { getRandomPositiveInteger, getRandomArrayElement, onEscKeydown, showAlert, appendFragment };
