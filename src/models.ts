export interface Day {
  date: string;
  weekday: string;
  times: string[];
}

export interface Schedule {
  startDate: string;
  endDate: string;
  days: Day[];
}
