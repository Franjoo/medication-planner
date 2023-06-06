import { useContext } from "react";
import stores, { StoreContext } from "../stores/stores";

export const useStore = () => useContext<typeof stores>(StoreContext);
