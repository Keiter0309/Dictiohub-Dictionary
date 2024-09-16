const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const day = date.getDay();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export const getCurrentTime = () => {
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};