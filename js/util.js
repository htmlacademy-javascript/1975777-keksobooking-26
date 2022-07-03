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

export {getRandomFloatingNumber, getRandomPositiveIntegerByRange, getRandomPositiveInteger, getRandomNewArray};
