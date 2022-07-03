/**
 *
 * @param from начало диапазона
 * @param to конец диапазона
 * @param digits количество знаков после запятой
 * @constructor
 */
const getRandomNumber = (from, to, digits) => {
  if (from < 0 || to < 0) {
    return null;
  }
  if (to < from) {
    const store = to;
    to = from;
    from = store;
  }
  return +(Math.random() * (to - from) + from).toFixed(digits);
};
getRandomNumber(55, 55, 3);

const TITLES = [
  'Апартаменты в стиле LOFT в Санкт-Петербурге',
  'Квартира в центре Санкт-Петербурга',
  'Великолепное место в самом центре Питера',
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

const getRandomFloatingNumber = (from, to, digits) => {//число с плавающей точкой
  if (from < 0 || to < 0) {
    return null;
  }
  if (to < from) {
    const store = to;
    to = from;
    from = store;
  }
  return +(Math.random() * (to - from) + from).toFixed(digits);
};

const getRandomPositiveIntegerByRange = (a, b) => { //функция, возвращающая положительное целое число в заданном промежутке
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveInteger = () => Math.ceil(Math.random() * 1000);

const getRandomNewArray = (arr) =>  arr.filter(() => Math.random() >= 0.5);

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
Array.from({length: 10}, createPost);
