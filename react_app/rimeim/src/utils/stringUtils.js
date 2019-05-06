export const API_URL = ''; //'https://rimeim.com/api';

export const getNumberFormatted = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
