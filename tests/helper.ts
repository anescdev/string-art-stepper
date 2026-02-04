import type { StringArtInfo } from "../src/types/string-art-info";
import type { StringArtStep } from "../src/types/string-art-step";

export function getMockedStringArtData() {
    return {
        parameters: {
            fileName: "test-file.json",
            pins: 100,
            lines: 200,
            backgroundColor: "#FFFFFF",
            lineWeight: 1,
            lineOpacity: 2
        } satisfies StringArtInfo, paths: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5 }
        ] satisfies StringArtStep[]
    }
}