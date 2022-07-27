const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

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

const getFilteredPost = (postList) => {
  const newArray = [];

  postList.forEach((post) => {
    if (newArray.length === 10) {
      return;
    }
    if (housingType.value !== 'any' && housingType.value !== post.offer.type) {// тип жилья
      return;
    }

    if (housingPrice.value !== 'any') {
      if (housingPrice.value === 'middle') {// стоимость жилья
        if (!(post.offer.price >= 10000 && post.offer.price < 50000)) {// стоимость жилья
          return;
        }
      }
      if (housingPrice.value === 'low') {
        if (!(post.offer.price < 10000)) {
          return;
        }
      }
      if (housingPrice.value === 'high') {
        if (!(post.offer.price >= 50000)) {
          return;
        }
      }
    }

    if (housingRooms.value !== 'any' && parseInt(housingRooms.value, 10) !== post.offer.rooms) { //количество комнат
      return;
    }
    if (housingGuests.value !== 'any' && parseInt(housingGuests.value, 10) !== post.offer.guests) {//количество гостей
      return;
    }
    if (!filterByFeatures(post)) {
      return;
    }

    newArray.push(post);
  });
  return newArray;
};
export {getFilteredPost};
