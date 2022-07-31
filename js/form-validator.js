const MIN_PRICE_WITH_HOUSING_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const ONE_ROOM = 1;
const TWO_ROOM = 2;
const THREE_ROOM = 3;
const ONE_HUNDRED_ROOMS = 100;
const NO_GUESTS = 0;

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
};

const numberOfRoom = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const type = document.querySelector('#type');
const priceNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const adForm = document.querySelector('.ad-form');

let pristine;

/**
 * Правило валидации кол-ва проживающих
 * @param capacity
 * @returns {boolean}
 */
const ruleCapacity = (capacity) => {
  const countNumberOfRoom = parseInt(numberOfRoom.value, 10);
  const capacityValue = parseInt(capacity, 10);

  if (countNumberOfRoom === ONE_ROOM) {
    return capacityValue === ONE_ROOM;
  }
  if (countNumberOfRoom === TWO_ROOM) {
    return capacityValue === ONE_ROOM || capacityValue === TWO_ROOM;
  }
  if (countNumberOfRoom === THREE_ROOM) {
    return capacityValue === ONE_ROOM || capacityValue === TWO_ROOM || capacityValue === THREE_ROOM;
  }
  if (countNumberOfRoom === ONE_HUNDRED_ROOMS) {
    return capacityValue === NO_GUESTS;
  }
  return false;
};

/**
 * Инициализация валидатора
 */
const initValidator = () => {
  pristine = new Pristine(adForm, pristineConfig);
  pristine.addValidator(capacityInput, ruleCapacity, 'Кол-во гостей не может превышать кол-во комнат');
};

/**
 * Перезапуск валидатора
 */
const restartValidator = () => {
  pristine.destroy();
  initValidator();
};

const validateForm = () => pristine.validate();

const resetErrors = () => pristine.reset();

/**
 * Обработчик изменения события поля "Тип жилья"
 */
type.addEventListener('change', () => {
  priceNight.placeholder = MIN_PRICE_WITH_HOUSING_TYPE[type.value];
  priceNight.dataset.pristineMinMessage = `Минимальная цена от ${MIN_PRICE_WITH_HOUSING_TYPE[type.value]}`;
  priceNight.min = MIN_PRICE_WITH_HOUSING_TYPE[type.value];
  // При смене атрибута min либо pristine-min валидатор не обновляет правило, и продолжает проверять по значению которое было при запуске
  // Т.к. нет нормально способа обновить правило у поля, мы пересоздаем валидатор
  restartValidator();
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

export {initValidator, restartValidator, validateForm, resetErrors};
