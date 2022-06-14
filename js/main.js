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


/*
НУЖНО НАПИСАТЬ ФУНКЦИИ, КОТОРЫЕ ПОМОГУТ СОЗДАТЬ МАССИВ ИЗ 10 СГЕНИРИРОВАННЫХ JS - ОБЪЕКТОВ (Каждый объект массива — описание похожего объявления неподалёку.)
AUTHOR
1)AVATAR - СЛУЧАЙНОЕ ЧИСЛО ОТ 1 ДО 10 Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
OFFER
 title, строка — заголовок предложения. Придумайте самостоятельно.
 address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
2) price, число — стоимость. СЛУЧАЙНОЕ ЦЕЛОЕ ПОЛОЖИТЕЛЬНОЕ  ЧИСЛО.
3) type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel. СЛУЧАЙНОЕ ЧИСЛО ОТ 1 ДО 5
4) rooms, число — количество комнат. Случайное целое положительное число. СЛУЧАЙНОЕ ПОЛОЖИТЕЛЬНОЕ ЧИСЛО
5) guests, число — количество гостей, которое можно разместить. СЛУЧАЙНОЕ ПОЛОЖИТЕЛЬНОЕ ЧИСЛО
6) checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00. СЛУЧАЙНОЕ ЧИСЛО ОТ 1 ДО 3
7) checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00. СЛУЧАЙНОЕ ЧИСЛО ОТ 1 ДО 3
8) features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.  СЛУЧАЙНОЕ ЧИСЛО ОБОЗНАЧАЮЩЕЕ ДЛИНУ МАССИВА
 description, строка — описание помещения. Придумайте самостоятельно.
9) photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, СЛУЧАЙНОЕ ЧИСЛО
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
10) location, объект — местоположение в виде географических координат. Состоит из двух полей:

lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.

lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
*/

const author = {avatar: 'img/avatars/user{{xx}}.png'};
const offer = {
  title: '',
  address: '{{location.lat}}, {{location.lng}}',
  price: 5000,
  type: '',
  rooms: 3,
  guests: 5,
  checkin: '',
  checkout: '',
  features: '',
  description: '',
  photos: '',
};

const title = [
  'Апартаменты в стиле LOFT в Санкт-Петербурге',
  'Квартира в центре Санкт-Петербурга',
  'Великолепное место в самом центре Питера',
  'Жилье для творческих людей',
]

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
]

const checkin = [
  '12:00',
  '13:00',
  '14:00',
]

const checkout = [
  '12:00',
  '13:00',
  '14:00',
]

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const description = [
  'Дизайнерское пространство с великолепными видами из окна, расположенное в самом сердце города. Просторные комнаты, обилие света и воздуха',
  'Место для свободолюбивых людей,ценящих практичность, креативность и минимализм',
  'Открытое помещение с высокими потолками и необычной мебелью, недалеко от центра города'
]
const location = {
  lat:,//lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  lng: // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
}

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]

const getRandomPositiveInteger = (a, b) => { //функция, возвращающая положительное целое число
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const createPost = () => {
  const randomAvatarNumber = getRandomPositiveInteger(0, 10);
  const randomPriceNumber = getRandomPositiveInteger(0, b);
  const randomRoomsNumber = getRandomPositiveInteger(0, b);
  const randomTitleIndex = getRandomPositiveInteger(0, title.length - 1)
  const randomTypeIndex = getRandomPositiveInteger(0, type.length - 1);
  const randomGuestsNumber = getRandomPositiveInteger(0, b);
  const randomChickenIndex = getRandomPositiveInteger(0, checkin.length - 1);
  const randomCheckoutIndex = getRandomPositiveInteger(0, checkout.length - 1);
  const randomDescriptionIndex = getRandomPositiveInteger(0, description.length - 1);

  return {//ФУНКЦИЯ ВОЗРАЩАЮЩАЯ МАССИВ
    author: '',
    offer: '',
    location: '',
  }
};

console.log(createPost());





