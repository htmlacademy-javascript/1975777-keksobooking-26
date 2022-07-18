const adForm = document.querySelector('.ad-form');
const numberOfRoom = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const type = document.querySelector('#type');
const priceNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  return !!isValid;
});

pristine.addValidator(capacityInput, (capacity) => {
  const oneRoom = 1;
  const twoRoom = 2;
  const threeRoom = 3;
  const oneHundredRooms = 100;
  const noGuests = 0;
  if (numberOfRoom.value === oneRoom) {
    return capacity.value === oneRoom;
  }
  if (numberOfRoom.value === twoRoom ) {
    return capacity.value === oneRoom || capacity.value === twoRoom;
  }
  if (numberOfRoom.value === threeRoom ) {
    return capacity.value === oneRoom || capacity.value === twoRoom || capacity.value === threeRoom;
  }
  if (numberOfRoom.value === oneHundredRooms) {
    return capacity.value === noGuests;
  }
  return false;
} );

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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
  const timeOne = timeIn.value;
  timeOut.value = timeOne;
});

timeOut.addEventListener('change', () => {
  const timeTwo = timeOut.value;
  timeIn.value = timeTwo;
});
