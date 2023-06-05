import { makeAutoObservable } from "mobx";

export class UiStore {
  constructor() {
    makeAutoObservable(this);
  }
}
