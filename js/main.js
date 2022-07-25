import './form.js';
import {initMap, createMarker, addMarkerToMap} from './map.js';
import {convertPostToHtmlElement} from './render.js';
import './slider.js';
import {getPostsFromServer} from './api/api-post.js';


initMap();
let postList;
getPostsFromServer()
  .then((response) => {
    postList = response;
    postList.forEach((post) => {
      convertPostToHtmlElement(post);
      const postMarker = createMarker(
        post.location.lat,
        post.location.lng,
        {
          popup: convertPostToHtmlElement(post)
        });
      addMarkerToMap(postMarker);
    });
  });

const mainMarker = createMarker(35.6895, 139.69171, {style: 'main', draggable: true});
addMarkerToMap(mainMarker);
const address = document.querySelector('#address');// поиск поля для ввода адреса

mainMarker.on('moveend', (evt) => { //обработчик события, срабатывает когда маркер перестает двигаться по карте
  const pinLocation = evt.target.getLatLng();
  address.value = `${pinLocation.lat.toFixed(5)} ${pinLocation.lng.toFixed(5)}`;
});
