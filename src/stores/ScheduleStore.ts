import { makeAutoObservable, runInAction } from "mobx";
import { Schedule } from "../models";
import {
  createEmptySchedule,
  toGermanDateString,
  toGermanTimeString,
} from "../utils";

export class ScheduleStore {
  // todo why here class?

  private rangeStart?: Date;
  private rangeEnd?: Date;
  private currentSchedule?: Schedule;

  constructor() {
    makeAutoObservable(this);
  }

  setRangeStart(start: Date) {
    runInAction(() => (this.rangeStart = start));
  }

  setRangeEnd(start: Date) {
    runInAction(() => (this.rangeEnd = start));
  }

  get schedule() {
    if (!this.rangeStart || !this.rangeEnd) return;
    if (!this.currentSchedule) {
      this.currentSchedule = createEmptySchedule(
        this.rangeStart,
        this.rangeEnd
      );
    }
    return this.currentSchedule;
  }

  addEntry(date: Date) {
    if (!this.currentSchedule) return;
    const day = this.currentSchedule.days.find(
      // todo 3 === ???
      (value) => toGermanDateString(value.date) == toGermanDateString(date)
    );
    day?.times.push(toGermanTimeString(date));
    this.currentSchedule = Object.assign({}, this.currentSchedule);
  }

  removeEntry(date: Date) {
    if (!this.currentSchedule) return;
    const day = this.currentSchedule.days.find(
      (value) => toGermanDateString(value.date) == toGermanDateString(date)
    );
    if (!day) return;

    const time = toGermanTimeString(date);
    const removeIndex = day.times.findIndex((value) => value == time);
    day.times.splice(removeIndex, 1);
    this.currentSchedule = Object.assign({}, this.currentSchedule);
  }
}
