const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormInactiveFieldset = document.querySelectorAll('fieldset');
const mapFiltersInactiveSelect = document.querySelectorAll('select');
const ESCAPE_KEY = 27;

const setFormStatus = (active) => {
  if (active) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map-filters--disabled');
  }

  for (let i = 0; i < adFormInactiveFieldset.length; i++) {
    adFormInactiveFieldset[i].disabled = !active;
  }
  for (let i = 0; i < mapFiltersInactiveSelect.length; i++) {
    mapFiltersInactiveSelect[i].disabled = !active;
  }
};

const createSlider = () => {
  const sliderElement = document.querySelector('.ad-form__slider');
  const valueElement = document.querySelector('#price');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 5000,
    step: 100,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
};

const createUploadFile = (fileSelector, previewSelector, srcMode) => {
  const fileInput = document.querySelector(fileSelector);
  const previewBlock = document.querySelector(previewSelector);
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      if (srcMode) {
        previewBlock.src = URL.createObjectURL(file);
      } else {
        previewBlock.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      }
    }
  });
};

const createModalWindow = (modalType, callbackHideMessage) => {
  if (!document.querySelector(`.${modalType}`)) {
    const messageBlock = document.querySelector(`#${modalType}`);
    const modalTemplate = messageBlock.content.querySelector(`.${modalType}`);
    const modalElement = modalTemplate.cloneNode(true);

    const successKeyDown = (event) => {
      if (event.keyCode === ESCAPE_KEY) {
        event.preventDefault();
        modalElement.remove();
        callbackHideMessage();
        document.removeEventListener('keydown', successKeyDown, false);
      }
    };

    document.addEventListener('keydown', successKeyDown);
    modalElement.addEventListener('click', () => {
      modalElement.remove();
      document.removeEventListener('keydown', successKeyDown, false);
      callbackHideMessage();

    });
    document.body.appendChild(modalElement);
    return modalElement;
  }
};

const showMessageSuccess = (callbackHideMessage) => {
  createModalWindow('success', callbackHideMessage);
};


const showMessageError = (callbackRetry, callbackHideMessage = ()=>{}) => {
  const messageError = createModalWindow('error', callbackHideMessage);
  if (messageError){
    messageError.querySelector('.error__button').addEventListener('click', (event) => {
      event.stopPropagation();
      callbackRetry();
      messageError.remove();
    });
  }
};


export {setFormStatus, createSlider, createUploadFile, showMessageSuccess, showMessageError};

