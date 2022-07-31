const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const ACTIVE_POST_SIZE = 10;
const FILTER_ANY_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

/**
 * Фильтрация по удобствам
 * @param offer
 * @returns {boolean}
 */
const filterByFeatures = ({offer}) => {
  const checkedFilters = housingFeatures.querySelectorAll('input:checked');

  if (!checkedFilters) {
    return true;
  }

  if (offer.features) {
    return Array.from(checkedFilters).every((feature) => offer.features.includes(feature.value));
  }

  return false;
};

/**
 * Фильтрация объявлений
 * @param postList
 * @returns {*[]}
 */
const getFilteredPost = (postList) => {
  const filteredPosts = [];

  for (let i = 0; i < postList.length; i++) {
    const post = postList[i];

    if (housingType.value !== FILTER_ANY_VALUE && housingType.value !== post.offer.type) {// тип жилья
      continue;
    }

    if (housingPrice.value !== FILTER_ANY_VALUE) {
      if (housingPrice.value === 'middle') {// стоимость жилья
        if (!(post.offer.price >= MIN_PRICE && post.offer.price < MAX_PRICE)) {// стоимость жилья
          continue;
        }
      }
      if (housingPrice.value === 'low') {
        if (!(post.offer.price < MIN_PRICE)) {
          continue;
        }
      }
      if (housingPrice.value === 'high') {
        if (!(post.offer.price >= MAX_PRICE)) {
          continue;
        }
      }
    }

    if (housingRooms.value !== FILTER_ANY_VALUE && parseInt(housingRooms.value, 10) !== post.offer.rooms) { //количество комнат
      continue;
    }
    if (housingGuests.value !== FILTER_ANY_VALUE && parseInt(housingGuests.value, 10) !== post.offer.guests) {//количество гостей
      continue;
    }
    if (!filterByFeatures(post)) {
      continue;
    }

    filteredPosts.push(post);

    if (filteredPosts.length === ACTIVE_POST_SIZE) {
      break;
    }
  }

  return filteredPosts;
};

export {getFilteredPost};
