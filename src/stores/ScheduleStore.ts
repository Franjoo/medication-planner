import { makeAutoObservable, reaction, toJS } from "mobx";
import { Day } from "../models";

import differenceInDays from "date-fns/differenceInDays";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isBefore from "date-fns/isBefore";
import { clamp, deepClone, emptyDay, localTimeString, weekday } from "../utils";
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
  incorrects: Map<number, Set<number>> = new Map();

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

    this.sanitizeFirstItemIndex();
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
    this.updateIncorrectEntries(dayIndex, timeIndex);
  }

  updateTimeEntry(dayIndex: number, timeIndex: number, time: string) {
    this.days[dayIndex].times[timeIndex] = time;
    this.updateIncorrectEntries(dayIndex, timeIndex);
  }

  updateIncorrectEntries(dayIndex: number, timeIndex: number) {
    if (timeIndex === 0) return;
    const before = this.days[dayIndex].times[timeIndex - 1];
    const current = this.days[dayIndex].times[timeIndex];

    const set = this.incorrects.get(dayIndex) || new Set();
    if (parseInt(current) < parseInt(before)) {
      set.add(timeIndex);
    } else {
      set.delete(timeIndex);
      if (set.size === 0) this.incorrects.delete(dayIndex);
    }
    this.incorrects.set(dayIndex, set);
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
    this.firstItemIndex = this.firstItemIndex + MAX_STEPS_PER_NAVIGATION;
    this.sanitizeFirstItemIndex();
  }

  previous() {
    this.firstItemIndex = this.firstItemIndex - MAX_STEPS_PER_NAVIGATION;
    this.sanitizeFirstItemIndex();
  }

  private sanitizeFirstItemIndex() {
    if (
      this.firstItemIndex < 0 ||
      this.firstItemIndex > this.days.length - MAX_ITEMS_PER_PAGE
    ) {
      this.firstItemIndex = clamp(
        this.firstItemIndex + MAX_STEPS_PER_NAVIGATION,
        0,
        this.days.length - MAX_ITEMS_PER_PAGE
      );
    }
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
