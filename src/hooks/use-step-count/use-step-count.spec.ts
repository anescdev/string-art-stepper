import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";
import { renderHook } from "vitest-browser-react";
import { useStepCount } from "./use-step-count";
import { loadStepsCount } from "@/data/steps-count";
import { ClearedDataEvent } from "@/events/cleared-data";

const initialStepCount = 42;
beforeAll(() => {
    vi.mock("@/data/steps-count", () => {
        return {
            loadStepsCount: vi.fn(() => initialStepCount)
        }
    })
});
afterEach(() => {
    vi.clearAllMocks();
});
afterAll(() => {
    vi.resetAllMocks();
});

test("Ensure initial value is loaded", async () => {
    const stepCount = await renderHook(() => useStepCount())
    expect(stepCount.result.current).toBe(initialStepCount);
    expect(loadStepsCount).toHaveBeenCalledOnce();
})
test("Ensure step count resets on ClearedDataEvent", async () => {
    const stepCount = await renderHook(() => useStepCount())
    expect(stepCount.result.current).toBe(initialStepCount);
    window.dispatchEvent(new ClearedDataEvent())
    await vi.waitFor(() => expect(stepCount.result.current).toBe(0));
})
test("Ensure event listener is cleaned up on unmount", async () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const stepCount = await renderHook(() => useStepCount())
    expect(addEventListenerSpy).toHaveBeenCalledWith(ClearedDataEvent.name, expect.any(Function));
    stepCount.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(ClearedDataEvent.name, expect.any(Function));
});