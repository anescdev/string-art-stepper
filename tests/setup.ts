import { vi } from "vitest"

vi.mock("i18next", () => {
    return {
        useTranslation: () => [
            (key: string) => key
        ]
    }
})