const filters = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const filterPost = (postList) => {
  let newArray = [];
  postList.forEach((post) => {
    if (newArray.length === 10) {
      return;
    }
    if (housingType.value !== 'any' && housingType.value !== post.offer.type) {// тип жилья
      return;
    }

    if (housingPrice.value !== 'any') {
      if (!(housingPrice.value === 'middle' && post.offer.price >= 10_000 && post.offer.price < 50_000)) {// стоимость жилья
        return;
      }
      if (!(housingPrice.value === 'low' && post.offer.price < 10_000)) {
        return;
      }
      if (!(housingPrice.value === 'high' && post.offer.price >= 50_000)) {
        return;
    }

      if (housingRooms.value !== 'any' && housingRooms.value !== post.offer.rooms) { //количество комнат
        return;
      }

      if (housingGuests.value !== 'any' && housingGuests.value !== post.offer.guests) {//количество гостей
      return;
      }

      if (housingFeatures.checked  === post.offer.features) {
        return;
      }
    }
    newArray.push(post);
  });
  return newArray;
};


