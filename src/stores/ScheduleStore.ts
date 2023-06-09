import { makeAutoObservable, reaction } from "mobx";
import { Day } from "../models";

import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isBefore from "date-fns/isBefore";
import { format } from "date-fns";
import { localTimeString, weekday } from "../utils";

export class ScheduleStore {
  rangeStart?: Date;
  rangeEnd?: Date;
  days: Day[] = [];
  showTemplates = false;
  sent = false;

  private DAYS_TO_DISPLAY = 7;
  private index = 0;
  private autoCompleted = false;

  constructor() {
    makeAutoObservable(this);
    this.initReactions();
  }

  send() {
    if (!this.rangeStart || !this.rangeEnd) return;
    const data = JSON.stringify({
      startDate: localTimeString(new Date(this.rangeStart)),
      rangeEnd: localTimeString(new Date(this.rangeEnd)),
      days: this.days,
    });
    // API.postSchedule(data)
    this.sent = true;
    console.info("---> schedule created\n\n", data);
  }

  setRangeStart(start: Date) {
    if (this.rangeEnd && this.rangeStart) {
      this.rangeEnd = addDays(
        this.rangeEnd,
        differenceInDays(start, this.rangeStart)
      );
    }
    this.rangeStart = start;
  }

  setRangeEnd(end: Date) {
    if (this.rangeStart && isBefore(end, this.rangeStart)) return;
    this.rangeEnd = end;
  }

  private updateSchedule() {
    if (!this.rangeStart || !this.rangeEnd) return;
    if (!this.days.length) this.resetTimesAndAutoComplete();

    const oldLength = this.days.length;
    const newLength = -differenceInDays(this.rangeStart, this.rangeEnd) + 1;
    const lengthDiff = Math.abs(newLength - oldLength);
    const firstDayElement = this.days[0];
    const lastDayElement = this.days[this.days.length - 1];

    if (this.rangeStart.getTime() != firstDayElement.date) {
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
    // debugger;

    console.log("updated days", this.days);
  }

  addTimeEntry(dayIndex: number) {
    const updatedDays = [...this.days];
    updatedDays[dayIndex].times.push("08:00");
    this.days = updatedDays;
  }

  removeTimeEntry(dayIndex: number, timeIndex: number) {
    const updatedDays = [...this.days];
    updatedDays[dayIndex].times.splice(timeIndex, 1);
    this.days = updatedDays;
  }

  updateTimeEntry(dayIndex: number, timeIndex: number, time: string) {
    console.log("updateTimeEntry", dayIndex, timeIndex, time);
    this.days[dayIndex].times[timeIndex] = time;
  }

  private createEmptyDays(startDate: Date, endDate: Date) {
    const daysCount = -differenceInDays(startDate, endDate) + 1;
    const days: Day[] = [];
    for (let i = 0; i < daysCount; i++) {
      const date = addDays(startDate, i);
      days.push({
        date: date.getTime(),
        weekday: format(date, "EEEE"),
        times: [],
      });
    }
    return days;
  }

  next() {
    this.index = Math.min(
      this.index + this.DAYS_TO_DISPLAY,
      this.days.length - this.DAYS_TO_DISPLAY
    );
  }

  previous() {
    this.index = Math.max(0, this.index - this.DAYS_TO_DISPLAY);
  }

  get daysCount() {
    return this.days?.length || 0;
  }

  get displayDays() {
    return this.days.slice(this.index, this.index + this.DAYS_TO_DISPLAY);
  }

  get scrollProgress() {
    return this.index / (this.days.length - this.DAYS_TO_DISPLAY);
  }

  setShowTemplates(show: boolean) {
    this.showTemplates = show;
  }

  get templateDays() {
    return [];
    // if (!this.autoCompleteEnabled) return;
    // const fromIndex = 0;
    // const toIndex = this.days.findIndex((value) => value.times.length === 0);
    // const partToCopy = this.days.slice(fromIndex, toIndex);
    // const copySteps = Math.floor(this.days.length / partToCopy.length);
    //
    // console.log(toIndex, partToCopy.length, copySteps);
    // const templateDays = [];
    // console.log("copy steps", copySteps);
    // for (let i = 0; i < copySteps; i++) {
    //   templateDays.push(...this.toShifted(partToCopy, -partToCopy.length));
    // }
    // return templateDays;
    // // return [];
  }

  get canGoForward() {
    return this.days.length - this.index > this.DAYS_TO_DISPLAY;
  }

  get canGoBackward() {
    return this.index > 0;
  }

  private toShifted(days: Day[], numDays: number) {
    const shifted = days.slice();
    shifted.forEach((dayDate) => {
      dayDate.date = subDays(dayDate.date, numDays).getTime();
      dayDate.weekday = weekday(dayDate.date);
      // dayDate.times.map((timeDate) => subDays(timeDate, numDays));
    });
    return shifted;
  }

  clone(day: Day) {
    const cloned: Day = {
      weekday: day.weekday,
      date: day.date,
      times: day.times.slice(0, day.times.length),
    };
    return cloned;
  }

  resetTimesAndAutoComplete() {
    if (!this.rangeStart || !this.rangeEnd) return;
    this.days = this.createEmptyDays(this.rangeStart, this.rangeEnd);
    this.autoCompleted = false;
  }

  clearDays() {
    this.days = [];
  }

  get resetEnabled() {
    return (
      this.days.length > 0 &&
      !!this.days.find((value) => value.times.length > 0)
    );
  }

  get uploadEnabled() {
    return (
      this.days.length > 0 &&
      !this.days.find((value) => value.times.length === 0)
    );
  }

  get autoCompleteEnabled() {
    return (
      this.days.length > 0 &&
      !this.autoCompleted &&
      !!this.days.find((value) => value.times.length === 0) &&
      !!this.days.find((value) => value.times.length > 0)
    );
  }

  initReactions() {
    reaction(
      () => [this.rangeStart, this.rangeEnd],
      () => this.updateSchedule()
    );
  }
}
