export interface Day {
  date: number;
  weekday: string;
  times: string[];
}

export interface Schedule {
  startDate: number;
  endDate: number;
  days: Day[];
}
