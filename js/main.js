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
  return +(Math.random()* (to - from) + from ).toFixed(digits);

};

getRandomNumber(55, 55, 3);

