import {createPost, FEATURES} from './data.js';

const popupType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const getRenderPost = (post) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarElement = cardTemplate.cloneNode(true);
  similarElement.querySelector('.popup__avatar').src = post.author.avatar;
  similarElement.querySelector('.popup__title').textContent = post.offer.title;
  similarElement.querySelector('.popup__text--address').textContent = post.offer.address;
  similarElement.querySelector('.popup__text--price').textContent = `${post.offer.price  } р/ночь`;
  similarElement.querySelector('.popup__type').textContent = popupType[post.offer.type] || '-';
  similarElement.querySelector('.popup__text--capacity').textContent = `${post.offer.rooms  } комнаты для ${  post.offer.guests  } гостей`;
  similarElement.querySelector('.popup__text--time').textContent = `Заезд после ${  post.offer.checkin  } выезд до ${  post.offer.checkout}`;
  FEATURES.forEach((feature) => {
    if (!post.offer.features.includes(feature)) {
      similarElement.querySelector(`.popup__feature--${  feature}`).classList.add('hidden');
    }
  });
  //similarElement.querySelectorAll('.popup__feature').textContent =post.offer.features;

  similarElement.querySelector('.popup__description').textContent = post.offer.description;
  similarElement.querySelector('.popup__photo').src = post.offer.photos;
  return similarElement;
};


const render = () => {
  const mapCanvas = document.querySelector('.map__canvas');

  const SIMILAR_POST = createPost();
  //const similarPostFragment = document.createDocumentFragment();
  mapCanvas.appendChild(getRenderPost(SIMILAR_POST));
};


export {render};

