import {getPostsFromServer} from './api/api-post.js';
import {setInactivePage, setActivePage} from './form-status.js';
import {getFilteredPost} from './filtering-post.js';
import {convertPostToHtmlElement} from './render.js';

let map = null;
let postList = [];
const markers = [];

/**
 * Добавление маркера на карту
 * @param lat
 * @param lng
 * @param options
 * @returns {*}
 */
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

/**
 * Обновление данных на карте
 */
const updateMapFlats = () => {
  const filteredPosts = getFilteredPost(postList);
  markers.forEach((marker) => {
    marker.remove();
  });
  filteredPosts.forEach((post) => {
    convertPostToHtmlElement(post);
    const postMarker = createMarker(
      post.location.lat,
      post.location.lng,
      {
        popup: convertPostToHtmlElement(post)
      });
    markers.push(postMarker.addTo(map));
  });
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

setInactivePage();
// Создание карты
map = L.map('map-canvas');
// задаем координаты Токио
map.setView({lat: 35.6895, lng: 139.69171,}, 13);

map.whenReady(setActivePage); // переключение режима страницы в активное состояние
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Получаем данные по API
getPostsFromServer()
  .then((response) => {
    postList = response;
    updateMapFlats();
  });


const mainMarker = createMarker(35.6895, 139.69171, {style: 'main', draggable: true});
mainMarker.addTo(map);
const address = document.querySelector('#address');// поиск поля для ввода адреса

mainMarker.on('moveend', (evt) => { //обработчик события, срабатывает когда маркер перестает двигаться по карте
  const pinLocation = evt.target.getLatLng();
  address.value = `${pinLocation.lat.toFixed(5)} ${pinLocation.lng.toFixed(5)}`;
});


const filters = ['housing-type', 'housing-price', 'housing-rooms', 'housing-guests', 'housing-features'];
filters.forEach((filter) => {
  document.querySelector(`#${filter}`).addEventListener('change', () => {
    debounce(updateMapFlats)();
  });
});
