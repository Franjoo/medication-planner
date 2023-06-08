import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import { Day } from "./models";

export const toGermanDateString = (date: Date) => format(date, "dd.MM.yyyy"); // ISO 8601
export const toIsoDateString = (date: Date) => format(date, "yyyy-MM-dd"); // ISO 8601

export const toTimeString = (date: Date) => format(date, "HH:mm");

export const last = <T>(array: T[]) => {
  if (!array.length) return;
  return array[array.length - 1];
};

export const first = <T>(array: T[]) => {
  if (!array.length) return;
  return array[0];
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

export const noop = () => {
  /* do nothing */
};
