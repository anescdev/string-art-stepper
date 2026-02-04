import { SavingStepCountError } from "@/errors/saving-step-count-error";
import { LOCAL_STORAGE_KEY_STEP } from "./helper";

export function saveStepCount(step: number) {
    if (step < 0 || !Number.isInteger(step)) throw new SavingStepCountError();
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, step.toString());
}