import { format } from "date-fns";

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

export const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

export const weekday = (date: Date) => {
  return format(date, "EEEE");
};

export const localDate = (date: Date) => {
  return new Date(date.toISOString().slice(0, -1));
};

export const localTimeString = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.sss");
};
