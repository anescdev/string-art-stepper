import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function clearStepsCount() {
    localStorage.removeItem(LOCAL_STORAGE_KEY_STEP);
}