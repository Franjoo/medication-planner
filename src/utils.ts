import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import { Day, Schedule } from "./models";

export const toGermanDateString = (date: string | Date) =>
  format(new Date(date), "dd.MM.yyyy"); // ISO 8601

export const toGermanTimeString = (date: string | Date) =>
  format(new Date(date), "HH:mm"); // ISO 8601

export const createEmptySchedule = (rangeStart: Date, rangeEnd: Date) => {
  const daysCount = -differenceInDays(rangeStart, rangeEnd);
  const days: Day[] = [];
  for (let i = 0; i < daysCount; i++) {
    const date = addDays(rangeStart, i);
    days.push({
      date: date,
      weekday: format(date, "EEEE"),
      times: [],
    });
  }

  const schedule: Schedule = {
    startDate: rangeStart.toString(),
    endDate: rangeEnd.toString(),
    days,
  };

  return schedule;
};
