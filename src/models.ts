export interface Day {
  date: Date;
  weekday: string;
  times: Date[];
}

export interface Schedule {
  startDate: Date;
  endDate: Date;
  days: Day[];
}
