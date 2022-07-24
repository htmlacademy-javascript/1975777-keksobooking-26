import {createPost} from './api/api-post.js';

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const numberOfRoom = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const type = document.querySelector('#type');
const priceNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const successMessageBlock = document.querySelector('#success');
const errorMessageBlock = document.querySelector('#error');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

pristine.addValidator(capacityInput, (capacity) => {
  const oneRoom = 1;
  const twoRoom = 2;
  const threeRoom = 3;
  const oneHundredRooms = 100;
  const noGuests = 0;
  const countNumberOfRoom = parseInt(numberOfRoom.value, 10);
  const capacityValue = parseInt(capacity, 10);

  if (countNumberOfRoom === oneRoom) {
    return capacityValue === oneRoom;
  }
  if (countNumberOfRoom === twoRoom) {
    return capacityValue === oneRoom || capacityValue === twoRoom;
  }
  if (countNumberOfRoom === threeRoom) {
    return capacityValue === oneRoom || capacityValue === twoRoom || capacityValue === threeRoom;
  }
  if (countNumberOfRoom === oneHundredRooms) {
    return capacityValue === noGuests;
  }
  return false;
}, 'Кол-во гостей не может превышать кол-во комнат');


/**
 * Обработчик изменения события поля "Тип жилья"
 */
type.addEventListener('change', () => {
  priceNight.placeholder = minPrice[type.value];
  priceNight.min = minPrice[type.value];
});

/**
 * Синхронизация полей «Время заезда» и «Время выезда»
 */
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


const showMessageSuccess = () => {
  if (!document.querySelector('.success')) {
    const successTemplate = successMessageBlock.content.querySelector('.success');
    successTemplate.cloneNode(true);
    document.body.appendChild(successTemplate);
  }
};

const showMessageError = () => {
  if (!document.querySelector('.error')) {
    const errorTemplate = errorMessageBlock.content.querySelector('.error');
    const errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__button').addEventListener('click', () => {
      sendFormCreatePost();
    });
    document.body.appendChild(errorElement);
  }
};

const sendFormCreatePost = () => {
  const isValid = pristine.validate();
  if (!isValid) {
    return false;
  }
  createPost(adForm)
    .then(() => {
      showMessageSuccess();
    })
    .catch(() => {
      showMessageError();
    });
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendFormCreatePost();
});
