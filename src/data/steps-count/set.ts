import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function saveStep(step: number) {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, step.toString());
}