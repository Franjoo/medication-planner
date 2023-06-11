export interface Day {
  date: number;
  weekday: string;
  times: string[];
  style?: Style;
}

export type Style = "primary" | "secondary" | "disabled" | "error";
