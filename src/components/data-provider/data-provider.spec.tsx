import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ClearedDataEvent } from "@/events/cleared-data";
// import { FileUploadedEvent } from "@/events/file-uploaded";

import DataProvider from "./data-provider";
import { use } from "react";
import { StringArtInfoContext } from "@/contexts/string-art-info";
import { StringArtStepsContext } from "@/contexts/string-art-steps";
import { toast } from "react-toastify";
import { FileUploadedEvent } from "@/events/file-uploaded";
import { getMockedStringArtData } from "../../../tests/helper";

function renderDataProvider() {
    return render(
        <DataProvider>
            <TestContextComponent />
        </DataProvider>
    );
}

const TestContextComponent = () => {
    const info = use(StringArtInfoContext);
    const steps = use(StringArtStepsContext);
    if (!info) return <span>No data</span>;
    return (
        <>
            <section>
                <h2>info</h2>
                <span>Filename: {info?.fileName}</span>
                <span>Pins: {info?.pins}</span>
                <span>Lines: {info?.lines}</span>
                <span>Background Color: {info?.backgroundColor}</span>
                <span>Line Weight: {info?.lineWeight}</span>
                <span>Line Opacity: {info?.lineOpacity}</span>
            </section>
            <br />
            <h2>Steps</h2>
            {steps.map((step, index) => (
                <span key={index}>{`Step ${index}: ${step.from}-${step.to}`}</span>
            ))}

        </>
    );
}

beforeAll(() => {
    vi.mock("@/data/steps-file", () => {
        return {
            loadedStringArtData: Promise.resolve(null),
            saveStringArtData: vi.fn(() => Promise.resolve())
        }
    });
});
afterAll(() => {
    vi.resetAllMocks();
});

test("Should parse correcly the file received from FileUploadedEvent", async () => {
    vi.spyOn(toast, "error");
    const { getByText } = await renderDataProvider();
    await expect.element(getByText("No data")).toBeInTheDocument();
    document.dispatchEvent(new FileUploadedEvent(new File([JSON.stringify(getMockedStringArtData())], "new-data.json", { type: "application/json" })))
    expect(toast.error).not.toHaveBeenCalled();
    await vi.waitFor(() => expect.element(getByText(`No data`)).not.toBeInTheDocument());
});


test("Should clear correctly the data when ClearedDataEvent is dispatched", async () => {
    const { getByText } = await renderDataProvider();
    document.dispatchEvent(new FileUploadedEvent(new File([JSON.stringify(getMockedStringArtData())], "test-file.json", { type: "application/json" })));
    await vi.waitFor(() => expect.element(getByText(`Filename: test-file.json`)).toBeInTheDocument());
    window.dispatchEvent(new ClearedDataEvent());
    await vi.waitFor(() => expect.element(getByText(`No data`)).toBeInTheDocument());
});
