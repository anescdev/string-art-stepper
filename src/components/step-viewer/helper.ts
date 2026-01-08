export const LOCAL_STORAGE_KEY_STEP = "string-art-step";

export function fetchSavedStep() {
    const savedStep = localStorage.getItem(LOCAL_STORAGE_KEY_STEP);
    return savedStep ? parseInt(savedStep) : 0;
}
export function saveStep(step: number) {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEP, step.toString());
}