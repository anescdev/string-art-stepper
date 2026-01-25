import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function loadStepsCount() {
    const savedStep = localStorage.getItem(LOCAL_STORAGE_KEY_STEP);
    return savedStep ? parseInt(savedStep) : 0;
}