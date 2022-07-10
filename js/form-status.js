const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormInactiveFieldset = document.querySelectorAll('fieldset');
const mapFiltersInactiveSelect = document.querySelectorAll('select');

function setInactivePage () {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-filters--disabled');

  for (let i = 0; i < adFormInactiveFieldset.length; i++) {
    adFormInactiveFieldset[i].disabled = true;
  }
  for (let i = 0; i < mapFiltersInactiveSelect.length; i++) {
    mapFiltersInactiveSelect[i].disabled = true;
  }
}

function setActivePage () {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for (let i = 0; i < adFormInactiveFieldset.length; i++) {
    adFormInactiveFieldset[i].disabled = false;
  }
  for (let i = 0; i < mapFiltersInactiveSelect.length; i++) {
    mapFiltersInactiveSelect[i].disabled = false;
  }
}

export {setInactivePage, setActivePage};

