import '../vendor/nouislider/nouislider.js';

const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

const SCALE_CONTROL_STEP = 25;

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 0,
    step: 1,
    unit: ' ',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ' ',
  },
];

let chosenEffect = EFFECTS[0];

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

noUiSlider.create(slider, {
  range: {
    min: EFFECTS[0].min,
    max: EFFECTS[0].max,
  },
  start: EFFECTS[0].max,
  step: EFFECTS[0].step,
});

export function updateSlider (effect = EFFECTS[0]) {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
  if (effect === EFFECTS[0]) {
    slider.classList.add('hidden');
    sliderContainer.classList.add('hidden');
  }
}

export function onFormChange (evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider(chosenEffect);
}

const onSliderUpdate = () => {
  previewImage.style.filter = 'none';
  previewImage.className = '';
  const effectValue = slider.noUiSlider.get();
  previewImage.classList.add(`effects__preview--${chosenEffect.name}`);
  previewImage.style.filter = `${chosenEffect.style}(${effectValue}${chosenEffect.unit})`;
  effectLevel.value = `${effectValue}`;
};

slider.noUiSlider.on('update', onSliderUpdate);
