import {setInactivePage, setActivePage} from './form-status.js';

setInactivePage();
const map = L.map('map-canvas'); //добавление карты

const initMap = () => {
  map
    .setView({ // координаты Токио
      lat: 35.6895,
      lng: 139.69171,
    }, 10);

  map.whenReady(setActivePage); // переключение режима страницы в активное состояние
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createMarker = (lat, lng, options) => {
  let pinIcon = null;
  if (options && options.style === 'main') {
    pinIcon = L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });
  } else {
    pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  }
  const market = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: options ? options.draggable : false,
      icon: pinIcon,
    },
  );

  if (options && options.popup) {
    const popup = L.popup().setContent(options.popup);
    market.bindPopup(popup).openPopup();
  }

  return market;
};


const addMarkerToMap = (marker) => {
  marker.addTo(map);
};


export {initMap, createMarker, addMarkerToMap};
