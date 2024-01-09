const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const SCALE_CONTROL_STEP = 25;

export function scaleImage (value = 100) {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
}

export function onSmallerScaleControlClick () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue > 25) {
    const newValue = currentValue - SCALE_CONTROL_STEP;
    scaleImage(newValue);
  }
}

export function onBiggerScaleControlClick () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue !== 100) {
    const newValue = currentValue + SCALE_CONTROL_STEP;
    scaleImage(newValue);
  }
}
