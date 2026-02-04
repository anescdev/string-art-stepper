import "fake-indexeddb/auto";
import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";
import { loadStepsCount } from "./load";
import { LOCAL_STORAGE_KEY_STEP } from "./helper";
import { clearStepsCount } from "./clear";
import { saveStepCount } from "./set";
import { SavingStepCountError } from "@/errors/saving-step-count-error";

beforeAll(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "removeItem");
});
afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
});
afterAll(() => {
    vi.resetAllMocks();
});

test("Retrieves step count from localStorage without value", () => {
    const stepCount = loadStepsCount();
    expect(stepCount).toBe(0);
    expect(Storage.prototype.getItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(Storage.prototype.getItem).toHaveReturnedWith(null);
})
test("Retrieves step count from localStorage with value", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, "1234");
    const stepCount = loadStepsCount();
    expect(stepCount).toBe(1234);
    expect(Storage.prototype.getItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(Storage.prototype.getItem).toHaveReturnedWith("1234");
})
test("Retrieves step count from localStorage with invalid value", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, "invalid");
    const stepCount = loadStepsCount();
    expect(stepCount).toBe(0);
    expect(Storage.prototype.getItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(Storage.prototype.getItem).toHaveReturnedWith("invalid");
})

test("Retrieves step count from localStorage with float value", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, "1234.56");
    const stepCount = loadStepsCount();
    expect(stepCount).toBe(1234);
    expect(Storage.prototype.getItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(Storage.prototype.getItem).toHaveReturnedWith("1234.56");
})
test("Retrieves step count from localStorage with negative value", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, "-789");
    const stepCount = loadStepsCount();
    expect(stepCount).toBe(0);
    expect(Storage.prototype.getItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(Storage.prototype.getItem).toHaveReturnedWith("-789");
})

test("Clear step count from localStorage", () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, "500");
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_STEP)).toBe("500");
    clearStepsCount();
    expect(Storage.prototype.removeItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_STEP)).toBeNull();
});

test("Save step count to localStorage", () => {
    const stepToSave = 2500;
    saveStepCount(stepToSave);
    expect(Storage.prototype.setItem).toHaveBeenCalledOnce();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY_STEP, stepToSave.toString());
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_STEP)).toBe(stepToSave.toString());
});
test.each([-100, 3.4, NaN, Infinity])("Save invalid step count %s to localStorage throws SavingStepCountError", (invalidStep) => {
    expect(() => saveStepCount(invalidStep as number)).toThrow(SavingStepCountError);
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem(LOCAL_STORAGE_KEY_STEP)).toBeNull();
});