export const API_URL = ""; //"https://rimeim.com/api";

export const getNumberFormatted = number => {
  number = Number(number).toFixed(2);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
