export const getArrNum = (arr) => arr.length;

export const sleep = (ms) => new Promise((r) => setTimeout(r), ms);

export const setItemToLocalStorage = (key, value) => {
  if (localStorage.getItem(key)) return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

export const sumItemsWithKey = (arr, key) => {
  return arr.filter((item) => item[key] === true).reduce((totals) => totals + 1, 0);
};

export const firstTenChars = (string) =>
  string.length <= 10 ? string : `${string.substring(0, 10)}...`;
