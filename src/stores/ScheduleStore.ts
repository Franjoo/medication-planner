import { makeAutoObservable, reaction } from "mobx";
import { Day } from "../models";

import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isBefore from "date-fns/isBefore";
import { deepClone, emptyDay, localTimeString, weekday } from "../utils";
import {
  MAX_ITEMS_PER_PAGE,
  MAX_STEPS_PER_NAVIGATION,
  MAX_TIME_ENTRIES_PER_DAY,
} from "../constants";

export class ScheduleStore {
  rangeStart?: Date;
  rangeEnd?: Date;
  days: Day[] = [];
  autoDays: Day[] = [];
  showAutoCompletes = false;
  sent = false;
  firstItemIndex = 0;
  autoCompleted = false;
  autoCompleteReady = false;

  constructor() {
    makeAutoObservable(this);
    this.initReactions();
  }

  send() {
    if (!this.rangeStart || !this.rangeEnd) return;
    const data = JSON.stringify({
      startDate: localTimeString(new Date(this.rangeStart)),
      rangeEnd: localTimeString(new Date(this.rangeEnd)),
      days: this.days.map((value) => {
        return {
          date: localTimeString(value.date),
          times: value.times,
          weekday: value.weekday,
        };
      }),
    });
    // API.postSchedule(data)
    this.sent = true;
    console.info("-> schedule created\n\n", data);
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

  private updateDateRange() {
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
  }

  private updateAutoDays() {
    if (this.autoCompleteReady) return;
    if (this.templateLength == 0 || this.templateLength == this.days.length) {
      return;
    }

    const fromIndex = 0;
    const toIndex = this.templateLength;
    const daysClone = deepClone(this.days);
    const template = daysClone.slice(fromIndex, toIndex);
    const clonedTimes = template.map((value) => value.times);

    let timeTemplateIndex = 0;
    for (let i = toIndex; i < daysClone.length; i++) {
      timeTemplateIndex %= clonedTimes.length;
      daysClone[i].times.push(...clonedTimes[timeTemplateIndex]);
      daysClone[i].style = "disabled";
      timeTemplateIndex++;
    }

    this.autoDays = daysClone.slice();
    this.autoCompleteReady = true;
  }

  autoComplete() {
    if (!this.autoDays) return;
    this.days = this.autoDays.map((value) => {
      return { ...value, style: "primary" };
    });
    this.showAutoCompletes = false;
  }

  setShowAutoCompletes(show: boolean) {
    if (!this.autoCompleteReady) {
      this.updateAutoDays();
    }
    this.showAutoCompletes = show;
  }

  addTimeEntry(dayIndex: number) {
    const updatedDays = [...this.days];
    if (updatedDays[dayIndex].times.length >= MAX_TIME_ENTRIES_PER_DAY) return;
    updatedDays[dayIndex].times.push("08:00");
    this.days = updatedDays;
  }

  removeTimeEntry(dayIndex: number, timeIndex: number) {
    const updatedDays = [...this.days];
    updatedDays[dayIndex].times.splice(timeIndex, 1);
    this.days = updatedDays;
  }

  updateTimeEntry(dayIndex: number, timeIndex: number, time: string) {
    this.days[dayIndex].times[timeIndex] = time;
  }

  private createEmptyDays(startDate: Date, endDate: Date) {
    const daysCount = -differenceInDays(startDate, endDate) + 1;
    const days: Day[] = [];
    for (let i = 0; i < daysCount; i++) {
      const date = addDays(startDate, i);
      days.push(emptyDay(date));
    }
    return days;
  }

  next() {
    this.firstItemIndex = Math.min(
      this.firstItemIndex + MAX_STEPS_PER_NAVIGATION,
      this.days.length - MAX_ITEMS_PER_PAGE
    );
  }

  previous() {
    this.firstItemIndex = Math.max(
      0,
      this.firstItemIndex - MAX_STEPS_PER_NAVIGATION
    );
  }

  get paginationProgress() {
    return this.firstItemIndex / (this.days.length - MAX_ITEMS_PER_PAGE);
  }

  get daysCount() {
    return this.days?.length || 0;
  }

  get templateLength() {
    return this.days.findLastIndex((value) => value.times.length) + 1;
  }

  get canGoForward() {
    return this.days.length - this.firstItemIndex > MAX_ITEMS_PER_PAGE;
  }

  get canGoBackward() {
    return this.firstItemIndex > 0;
  }

  private toShifted(days: Day[], numDays: number) {
    return days.slice().map((value) => ({
      ...value,
      date: subDays(value.date, numDays).getTime(),
      weekday: weekday(value.date),
    }));
  }

  resetTimesAndAutoComplete() {
    if (!this.rangeStart || !this.rangeEnd) return;
    this.days = this.createEmptyDays(this.rangeStart, this.rangeEnd);
    this.autoCompleted = false;
  }

  resetSentStatus() {
    this.sent = false;
  }

  clearDays() {
    this.days = [];
  }

  initReactions() {
    reaction(
      () => [this.rangeStart, this.rangeEnd],
      () => this.updateDateRange()
    );
    reaction(
      () => [this.days],
      () => (this.autoCompleteReady = false)
    );
  }
}
