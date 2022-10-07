import dayjs from "dayjs";

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
