import {getPostsFromServer} from './api/api-post.js';
import {setFormStatus} from './form-utils.js';
import {getFilteredPost} from './filtering-post.js';
import {convertPostToHtmlElement, createMarker} from './map-utils.js';
import {debounce} from './utils.js';

let map = null;
let mainMarker = null;
let postList = [];
const markers = [];
const filters = ['housing-type', 'housing-price', 'housing-rooms', 'housing-guests', 'housing-features'];
const CENTER_TOKYO = {lat: 35.6895, lng: 139.69171,};
const DEFAULT_ZOOM = 13;

const address = document.querySelector('#address');// поиск поля для ввода адреса

/**
 * Очистка карты от маркеров
 */
const clearMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

const addMarkers = (posts) => {
  posts.forEach((post) => {
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

/**
 * Обновление данных на карте
 */
const updateMapFlats = () => {
  clearMarkers();
  const filteredPosts = getFilteredPost(postList);
  addMarkers(filteredPosts);
};

/**
 * Инициализация карты
 */
const initMap = () => {
  setFormStatus(false);
  // Создание карты
  map = L.map('map-canvas');

  // переключение режима страницы в активное состояние
  map.whenReady(() => {
    setFormStatus(true);
  });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

/**
 * Инициализация карты
 */
const createMainMarker = () => {
  mainMarker = createMarker(CENTER_TOKYO.lat, CENTER_TOKYO.lng, {style: 'main', draggable: true});
  address.value = `${CENTER_TOKYO.lat.toFixed(5)} ${CENTER_TOKYO.lng.toFixed(5)}`;
  mainMarker.addTo(map);

  //обработчик события, срабатывает когда маркер перестает двигаться по карте
  mainMarker.on('move', (evt) => {
    debounce(() => {
      const pinLocation = evt.target.getLatLng();
      address.value = `${pinLocation.lat.toFixed(5)} ${pinLocation.lng.toFixed(5)}`;
    })();
  });
};

/**
 * Сброс положения основного маркера
 */
const resetMainMarker = () => {
  address.value = `${CENTER_TOKYO.lat.toFixed(5)} ${CENTER_TOKYO.lng.toFixed(5)}`;
  mainMarker.setLatLng(CENTER_TOKYO);
};

/**
 * Сброс область отображения на карте
 */
const resetMapView = () => {
  // задаем координаты Токио
  map.setView({lat: CENTER_TOKYO.lat, lng: CENTER_TOKYO.lng}, DEFAULT_ZOOM);
};

initMap();
resetMapView();
createMainMarker();

// Получаем данные по API
getPostsFromServer()
  .then((response) => {
    postList = response;
    updateMapFlats();
  });

filters.forEach((filter) => {
  document.querySelector(`#${filter}`).addEventListener('change', () => {
    debounce(updateMapFlats)();
  });
});

window.map = {};
window.map.resetMainMarker = resetMainMarker;
window.map.resetMapView = resetMapView;
window.map.updateMapFlats = updateMapFlats;
