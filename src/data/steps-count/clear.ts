import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function clearSteps() {
    localStorage.removeItem(LOCAL_STORAGE_KEY_STEP);
}