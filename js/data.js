import {getRandomFloatingNumber, getRandomPositiveIntegerByRange, getRandomPositiveInteger, getRandomNewArray} from './util.js';
const TITLES = [
  'Апартаменты в стиле LOFT',
  'Квартира в центре Токио',
  'Великолепное место в самом центре Токио',
  'Жилье для творческих людей',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Дизайнерское пространство с великолепными видами из окна, расположенное в самом сердце города. Просторные комнаты, обилие света и воздуха',
  'Место для свободолюбивых людей,ценящих практичность, креативность и минимализм',
  'Открытое помещение с высокими потолками и необычной мебелью, недалеко от центра города'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createPost = () => {
  let randomAvatarNumber = getRandomPositiveIntegerByRange(1, 10);
  randomAvatarNumber = randomAvatarNumber.toString().padStart(2, '0');
  const author = {
    avatar: `img/avatars/user${  randomAvatarNumber  }.png`
  };
  const offer = {};
  offer.title = TITLES[getRandomPositiveIntegerByRange(0, TITLES.length - 1)];
  const coordinates = {
    lat: getRandomFloatingNumber(35.65, 35.7, 5),
    lng: getRandomFloatingNumber(139.7, 139.8, 5)
  };

  offer.address = `${coordinates.lat  }, ${  coordinates.lng}`;
  offer.type = TYPES[getRandomPositiveIntegerByRange(0, TYPES.length - 1)];
  offer.guests = getRandomPositiveIntegerByRange(1, 10);
  offer.rooms = getRandomPositiveIntegerByRange(1, 10);
  offer.price = getRandomPositiveInteger() * offer.guests * offer.rooms;
  offer.checkin = TIMES[getRandomPositiveIntegerByRange(0, TIMES.length - 1)];
  offer.checkout = TIMES[getRandomPositiveIntegerByRange(0, TIMES.length - 1)];
  offer.description = DESCRIPTIONS[getRandomPositiveIntegerByRange(0, DESCRIPTIONS.length - 1)];
  offer.features = getRandomNewArray(FEATURES);
  offer.photos = getRandomNewArray(PHOTOS);

  return {//ФУНКЦИЯ ВОЗРАЩАЮЩАЯ МАССИВ
    author,
    offer,
    location:coordinates
  };
};
export {createPost, FEATURES};
