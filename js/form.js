const adForm = document.querySelector('.ad-form');
const numberOfRoom = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log('+++++++');
  const isValid = pristine.validate();
  if (isValid) {
    return true;
  } else {
    return false;
  }
});

pristine.addValidator(capacityInput, (capacity) => {
  if (numberOfRoom.value === 1) {
    return capacity.value === 1;
  }
  if (numberOfRoom === 2 ) {
    return capacity.value === 1 || capacity.value === 2;
  }
  if (numberOfRoom.value === 3 ) {
    return capacity.value === 1 || capacity.value === 2 || capacity.value === 3;
  }
  if (numberOfRoom.value === 100) {
    return capacity.value === 0;
  }
  return false;
}, 'Недопустимое размещение' );

