import dayjs from "dayjs";

var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

export const getDateRange = (type) => {
  const start = dayjs().startOf(type);
  const end = dayjs().endOf(type);

  const firstDate = dayjs(start).format("YYYY-MM-DD");
  const lastDate = dayjs(end).format("YYYY-MM-DD");
  return {
    firstDate: firstDate,
    lastDate: lastDate,
  };
};

export const compareDate = (start, end) => {
  const startDate = standarDateFormat(start);
  const endDate = standarDateFormat(end);
  if (start === end) {
    return true;
  }
  const isValid = dayjs(start).isBefore(dayjs(end), "d");

  return isValid;
};

export const isDateBetween = (start, end, current) => {
  return dayjs(current).isBetween(start, end, "[)");
};

export const standarDateFormat = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDisplayDate = (date) => {
  return dayjs(date).format("MMM DD, YYYY hh:mm a");
};

export const getCurrentDate = () => {
  return dayjs().format("MMM DD, YYYY hh:mm a");
};
