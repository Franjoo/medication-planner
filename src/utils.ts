import { format } from "date-fns";
import { Day } from "./models";

export const toGermanDateString = (date: Date) => format(date, "dd.MM.yyyy");

export const toIsoDateString = (date: Date) => format(date, "yyyy-MM-dd"); // ISO 8601

export const emptyDay = (date: Date): Day => {
  return {
    date: date.getTime(),
    weekday: format(date, "EEEE"),
    times: [],
    style: "secondary",
  };
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

export const noop = () => {
  /* do nothing */
};

export const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

export const weekday = (date: Date | number) => {
  return format(date, "EEEE");
};

export const localTimeString = (date: Date | number) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.sss");
};

export const deepClone = <T>(o: T): T => {
  return JSON.parse(JSON.stringify(o));
};
