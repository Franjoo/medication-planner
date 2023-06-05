import { createContext } from "react";
import { UiStore } from "./UiStore";

const ui: UiStore = new UiStore();

const stores = {
  ui,
};

export const StoreContext = createContext(stores);
export default stores;
