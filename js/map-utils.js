const mainPin = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const defaultPin = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const popupType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

/**
 * Преобразовать новость в HTML элемент (Node)
 * @param post
 * @returns {Node}
 */
const convertPostToHtmlElement = (post) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarElement = cardTemplate.cloneNode(true);
  similarElement.querySelector('.popup__text--capacity').textContent = `${post.offer.rooms} комнаты для ${post.offer.guests} гостей`;
  similarElement.querySelector('.popup__text--time').textContent = `Заезд после ${post.offer.checkin} выезд до ${post.offer.checkout}`;
  similarElement.querySelector('.popup__text--address').textContent = post.offer.address;
  similarElement.querySelector('.popup__title').textContent = post.offer.title;
  similarElement.querySelector('.popup__text--price').textContent = `${post.offer.price} р/ночь`;
  similarElement.querySelector('.popup__type').textContent = popupType[post.offer.type];

  if (post.author.avatar) {
    similarElement.querySelector('.popup__avatar').src = post.author.avatar;
  } else {
    similarElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (post.offer.features) {
    FEATURES.forEach((feature) => {
      if (!post.offer.features.includes(feature)) {
        similarElement.querySelector(`.popup__feature--${feature}`).classList.add('hidden');
      }
    });
  }

  if (post.offer.description) {
    similarElement.querySelector('.popup__description').textContent = post.offer.description;
  } else {
    similarElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (post.offer.photos) {
    similarElement.querySelector('.popup__photo').remove();
    post.offer.photos.forEach((img) => {
      const photoBlock = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);
      photoBlock.src = img;
      similarElement.querySelector('.popup__photos').appendChild(photoBlock);
    });
  } else {
    similarElement.querySelector('.popup__photo').classList.add('hidden');
  }
  return similarElement;
};

/**
 * Добавление маркера на карту
 * @param lat
 * @param lng
 * @param options
 * @returns {*}
 */
const createMarker = (lat, lng, options) => {
  const pinIcon = options && options.style === 'main' ? L.icon(mainPin) : L.icon(defaultPin);
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

export {convertPostToHtmlElement, createMarker};
