import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Schedule } from "../models";
import {
  createEmptySchedule,
  toGermanDateString,
  toGermanTimeString,
} from "../utils";
import differenceInDays from "date-fns/differenceInDays";

export class ScheduleStore {
  // todo why here class?

  private rangeStart?: Date;
  private rangeEnd?: Date;
  private currentSchedule?: Schedule;

  constructor() {
    makeAutoObservable(this);
    // this.initReactions();
  }

  setRangeStart(start: Date) {
    console.log("setRangeStart", start);
    runInAction(() => (this.rangeStart = start));
  }

  setRangeEnd(end: Date) {
    console.log("setRangeEnd", end);
    runInAction(() => {
      this.rangeEnd = end;
    });
  }

  get daysCount() {
    if (!this.currentSchedule) return 0;
    return this.currentSchedule.days.length;
  }

  get schedule() {
    this.updateSchedule();
    return this.currentSchedule;
  }

  createNewSchedule() {
    if (!this.rangeStart || !this.rangeEnd) return;
    this.currentSchedule = createEmptySchedule(this.rangeStart, this.rangeEnd);
  }

  updateSchedule() {
    if (!this.rangeStart || !this.rangeEnd) return;
    if (!this.currentSchedule) return this.createNewSchedule();

    const oldLength = this.currentSchedule.days.length;
    const newLength = -differenceInDays(this.rangeStart, this.rangeEnd) + 1;

    console.log("old", oldLength, "new", newLength);
    if (newLength > oldLength) {
      const newSchedule = createEmptySchedule(this.rangeStart, this.rangeEnd);
      newSchedule.days.splice(0, oldLength, ...this.currentSchedule.days);
      runInAction(() => {
        this.currentSchedule = newSchedule;
      });
    }
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

  // initReactions() {
  //   reaction(
  //     () => [this.rangeStart, this.rangeEnd],
  //     () => this.updateSchedule()
  //   );
  // }
}
