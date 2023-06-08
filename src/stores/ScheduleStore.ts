import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Day } from "../models";

import isSameDay from "date-fns/isSameDay";

import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isBefore from "date-fns/isBefore";
import { format } from "date-fns";

export class ScheduleStore {
  // todo why here class?

  rangeStart?: Date;
  rangeEnd?: Date;
  days: Day[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initReactions();
  }

  setRangeStart(start: Date) {
    runInAction(() => {
      if (this.rangeEnd && this.rangeStart) {
        this.rangeEnd = addDays(
          this.rangeEnd,
          differenceInDays(start, this.rangeStart)
        );
      }
      this.rangeStart = start;
    });
  }

  setRangeEnd(end: Date) {
    this.rangeEnd = end;
  }

  get daysCount() {
    return this.days?.length || 0;
  }

  toShifted(days: Day[], numDays: number) {
    const shifted = [...days];
    shifted.forEach((dayDate) => {
      dayDate.date = subDays(dayDate.date, numDays);
      dayDate.weekday = this.weekday(dayDate.date);
      dayDate.times.map((timeDate) => subDays(timeDate, numDays));
    });
    return shifted;
  }

  updateSchedule() {
    if (!this.rangeStart || !this.rangeEnd) return;
    if (!this.days.length) {
      this.days = this.createEmptyDays(this.rangeStart, this.rangeEnd);
    }

    const oldLength = this.days.length;
    const newLength = -differenceInDays(this.rangeStart, this.rangeEnd) + 1;
    const lengthDiff = Math.abs(newLength - oldLength);
    const firstDayElement = this.days[0];
    const lastDayElement = this.days[this.days.length - 1];

    if (this.rangeStart.getTime() != firstDayElement.date.getTime()) {
      const diff = -differenceInDays(this.rangeStart, firstDayElement.date);
      this.days = this.toShifted(this.days, diff);
    } else {
      if (isBefore(this.rangeEnd, lastDayElement.date)) {
        this.days = this.days.slice(0, newLength);
      } else {
        this.days = this.days.concat(
          ...this.createEmptyDays(
            addDays(lastDayElement.date, 1),
            addDays(lastDayElement.date, lengthDiff)
          )
        );
      }
    }
  }

  addTimeEntry(date: Date) {
    if (!this.days) return;
    const dayToUpdateIndex = this.days.findIndex((day) =>
      isSameDay(day.date, date)
    );
    if (dayToUpdateIndex == -1) return;
    const updatedDays = [...this.days];
    updatedDays[dayToUpdateIndex].times.push(date);
    this.days = updatedDays;
  }

  removeTimeEntry(date: Date) {
    if (!this.days) return;
    const dayToUpdateIndex = this.days.findIndex((day) =>
      isSameDay(day.date, date)
    );
    if (dayToUpdateIndex == -1) return;
    const updatedDays = [...this.days];
    const timeToRemoveIndex = updatedDays[dayToUpdateIndex].times.findIndex(
      (time) => time.getTime() === date.getTime()
    );
    if (timeToRemoveIndex == -1) return;
    updatedDays[dayToUpdateIndex].times.splice(timeToRemoveIndex, 1);
    this.days = updatedDays;
  }

  createEmptyDays(startDate: Date, endDate: Date) {
    const daysCount = -differenceInDays(startDate, endDate) + 1;
    const days: Day[] = [];
    for (let i = 0; i < daysCount; i++) {
      const date = addDays(startDate, i);
      days.push({
        date: date,
        weekday: format(date, "EEEE"),
        times: [],
      });
    }

    return days;
  }

  weekday(date: Date) {
    return format(date, "EEEE");
  }

  initReactions() {
    reaction(
      () => [this.rangeStart, this.rangeEnd],
      () => this.updateSchedule()
    );
  }
}
