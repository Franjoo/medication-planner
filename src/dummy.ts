import { Schedule } from "./models";

export const dummySchedule: Schedule = {
  startDate: "2023-02-27T06:00:00",
  endDate: "2023-03-15T06:00:00",
  days: [
    {
      date: "2023-02-27T06:00:00",
      weekday: "Sunday",
      times: ["09:00", "12:00", "16:00"],
    },
    {
      date: "2023-02-28T06:00:00",
      weekday: "Monday",
      times: ["09:00", "12:00", "16:00"],
    },
  ],
};
