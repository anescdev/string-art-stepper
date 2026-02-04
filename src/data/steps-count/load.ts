import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function loadStepsCount() {
    const savedStep = localStorage.getItem(LOCAL_STORAGE_KEY_STEP);
    if (!savedStep) return 0;
    const parsedStep = parseInt(savedStep);
    if (isNaN(parsedStep)) return 0;
    return parsedStep < 0 ? 0 : parsedStep;
}