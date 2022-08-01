import {createPost} from './api/api-post.js';
import {initValidator, validateForm, resetErrors} from './form-validator.js';
import {createSlider, createUploadFile, showMessageSuccess, showMessageError} from './form-utils.js';

const adForm = document.querySelector('.ad-form');
const resetFormBtn = document.querySelector('.ad-form__reset');

function resetForm() {
  window.map.resetMainMarker();
  window.map.resetMapView();
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  resetErrors();
  window.map.updateMapFlats();

  document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
  document.querySelector('.ad-form__photo').style.backgroundImage = '';
  document.querySelector('#price').value = 5000;
  document.querySelector('.ad-form__slider').noUiSlider.set(5000);
}


function sendFormCreatePost() {
  if (!validateForm()) {
    return false;
  }
  createPost(adForm)
    .then(() => {
      showMessageSuccess(resetForm);
    })
    .catch(() => {
      showMessageError(sendFormCreatePost);
    });
}

initValidator();
createSlider();
createUploadFile('.ad-form__field input[type=file]', '.ad-form-header__preview img', true);
createUploadFile('.ad-form__upload input[type=file]', '.ad-form__photo', );

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendFormCreatePost();
});

resetFormBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

