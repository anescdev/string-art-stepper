import { render } from "vitest-browser-react";
import { afterAll, expect, test, vi } from "vitest"

import { StringArtInfoContext } from "@/contexts/string-art-info";
import type { StringArtInfo } from "@/types/string-art-info";

import MetaInfo from "./metainfo";

const renderMetaInfo = (metadata: StringArtInfo | null = null) => {
    return render(
        <StringArtInfoContext value={metadata}>
            <MetaInfo />
        </StringArtInfoContext>
    );
}

afterAll(() => {
    vi.resetAllMocks();
});

test("Show no data message when StringArtInfoContext is null", async () => {
    const component = await renderMetaInfo();
    await component.getByRole("button", { name: "toolbar.showMetadataButton" }).click();
    await expect.element(component.getByText("metadata.noData")).toBeInTheDocument();
})

test("Show metadata when StringArtInfoContext has data", async () => {
    const mockedMetaData: StringArtInfo = {
        fileName: "filename",
        pins: 100,
        lines: 200,
        backgroundColor: "#FFFFFF",
        lineWeight: 1,
        lineOpacity: 1
    }
    const component = await renderMetaInfo(mockedMetaData);
    await component.getByRole("button", { name: "toolbar.showMetadataButton" }).click();
    await expect.element(component.getByText(mockedMetaData.fileName)).toBeInTheDocument();
    await expect.element(component.getByText(mockedMetaData.lines.toString())).toBeInTheDocument();
    await expect.element(component.getByText(mockedMetaData.pins.toString())).toBeInTheDocument();
})