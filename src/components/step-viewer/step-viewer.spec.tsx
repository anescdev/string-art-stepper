import { StringArtStepsContext } from "@/contexts/string-art-steps";
import type { StringArtStep } from "@/types/string-art-step";
import { render } from "vitest-browser-react";
import StepViewer from "./step-viewer";
import { afterAll, expect, test, vi } from "vitest";

vi.mock("@/data/steps-count", () => ({
    saveStepCount: vi.fn((step) => console.log("Mock saveStepCount called with step:", step)),
}));

const renderStepViewer = ({
    data = [], initialStepIndex = 0
}: { data?: StringArtStep[], initialStepIndex?: number }) => {
    return render(
        <StringArtStepsContext value={data}>
            <StepViewer initialStepIndex={initialStepIndex} />
        </StringArtStepsContext>
    )
}

const toShowPin = (pin: number) => pin + 1;

const data: StringArtStep[] = [
    { from: 0, to: 5 },
    { from: 5, to: 10 },
    { from: 10, to: 15 },
];

afterAll(() => {
    vi.resetAllMocks()
});

test("StepViewer renders correctly with no steps", async () => {
    const component = await renderStepViewer({});
    await expect.element(component.container).toBeEmptyDOMElement();
})

test("StepViewer renders correctly with steps", async () => {
    const component = await renderStepViewer({ data });
    await expect.element(component.getByText(`${toShowPin(data[0].from)}→${toShowPin(data[0].to)}`)).toBeInTheDocument();
});

test("StepViewer starts at initial step index", async () => {
    const initialStepIndex = 1;
    const component = await renderStepViewer({ data, initialStepIndex });
    await expect.element(component.getByText(`${toShowPin(data[initialStepIndex].from)}→${toShowPin(data[initialStepIndex].to)}`)).toBeInTheDocument();
});

test("StepViewer handles out of bounds initial step index", async () => {
    const initialStepIndex = 10;
    const lastElementIndex = data.length - 1;
    const component = await renderStepViewer({ data, initialStepIndex });
    await expect.element(component.getByText(`${toShowPin(data[lastElementIndex].from)}→${toShowPin(data[lastElementIndex].to)}`)).toBeInTheDocument()
});

test("StepViewer handles negative initial step index", async () => {
    const initialStepIndex = -1;
    const component = await renderStepViewer({ data, initialStepIndex });
    await expect.element(component.getByText(`${toShowPin(data[0].from)}→${toShowPin(data[0].to)}`)).toBeInTheDocument();
});

test("StepViewer navigation buttons disabled at bounds", async () => {
    const component = await renderStepViewer({ data, initialStepIndex: 0 });
    await expect.element(component.getByRole("button", { name: /stepViewer.previousStepButton/i })).toBeDisabled();
    const nextButton = component.getByRole("button", { name: /stepViewer.nextStepButton/i });
    await vi.waitUntil(async () => {
        await nextButton.click();
        return component.getByRole("button", { name: /stepViewer.nextStepButton/i, disabled: true }).query()
    })
    await expect.element(component.getByRole("button", { name: /stepViewer.previousStepButton/i })).not.toBeDisabled();
    await expect.element(component.getByRole("button", { name: /stepViewer.nextStepButton/i, disabled: true })).toBeInTheDocument();
});

test("Cleanup events are removed on unmount", async () => {
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
    const component = await renderStepViewer({ data });
    expect(window.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
    component.unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
});