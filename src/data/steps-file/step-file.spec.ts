import { afterEach, expect, test, vi } from "vitest";

import { clearData, saveStringArtData } from "@/data/steps-file";
import { getMockedStringArtData } from "../../../tests/helper";
import { ClearingDataError } from "@/errors/clearing-data-error";
import { loadStringArtData } from "./load";

afterEach(async () => {
    await clearData()
});

test("Ensure the info and steps is saved correctly", async () => {
    const mockedSaveStringArtData = vi.fn(saveStringArtData);
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    expect(mockedSaveStringArtData).not.toThrowError(ClearingDataError)
});
test("Ensure clearing data does not throw an error", async () => {
    const mockedClearData = vi.fn(clearData);
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    await clearData();
    expect(mockedClearData).not.toThrowError(ClearingDataError)
});
test("Ensure saving data after clearing does not throw an error", async () => {
    const mockedSaveStringArtData = vi.fn(saveStringArtData);
    const mockedClearData = vi.fn(clearData);
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    await clearData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    expect(mockedClearData).not.toThrowError(ClearingDataError)
    expect(mockedSaveStringArtData).not.toThrowError(ClearingDataError)
});
test("Ensure clearing data when no data is present does not throw an error", async () => {
    const mockedClearData = vi.fn(clearData);
    await clearData();
    expect(mockedClearData).not.toThrowError(ClearingDataError)
});
test("Ensure saving empty data does not throw an error", async () => {
    const mockedSaveStringArtData = vi.fn(saveStringArtData);
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, []);
    expect(mockedSaveStringArtData).not.toThrowError(ClearingDataError)
});
test("Ensure reading data after clearing does not throw an error", async () => {
    const mockedClearData = vi.fn(clearData);
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    await clearData();
    expect(mockedClearData).not.toThrowError(ClearingDataError)
});
test("Ensure reading data when no data is present does not throw an error", async () => {
    const mockedData = await loadStringArtData();
    await vi.waitFor(() => expect(mockedData).toBeNull());
});
test("Ensure reading data after saving matches", async () => {
    const mockedData = getMockedStringArtData();
    await saveStringArtData(mockedData.parameters, mockedData.paths);
    const readedData = await loadStringArtData();
    expect(readedData?.info.fileName).toBe(mockedData.parameters.fileName);
});