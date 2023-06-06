import { createContext } from "react";
import { ScheduleStore } from "./ScheduleStore";

const schedule: ScheduleStore = new ScheduleStore();

const stores = {
  schedule,
};

export const StoreContext = createContext(stores);
export default stores;
