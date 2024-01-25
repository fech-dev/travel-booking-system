import { format as dateFnsFormat } from "date-fns";

const DATE_FORMAT = "yyyy-MM-dd";
const DATETIME_FORMAT = DATE_FORMAT + " HH:mm:ss";

export const formatDate = (date: Date | string) => {
  return dateFnsFormat(date, DATE_FORMAT);
};

export const formatDateTime = (date: Date | string) => {
  return dateFnsFormat(date, DATETIME_FORMAT);
};
