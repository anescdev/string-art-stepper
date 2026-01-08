import { Suspense, use, useEffect, useState } from "react";
import type { StringArtInfo } from "../@types/string-art-info";
import type { StringArtStep } from "../@types/string-art-step";
import { FileUploadedEvent } from "../events/file-uploaded";
import { StringArtInfoContext, StringArtStepsContext } from "../contexts";
import { saveStringArtData } from "../data/save";
import loadedData from "../data/load";

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const stringArtData = use(loadedData)
    // const stringArtData = null as { info: StringArtInfo, steps: StringArtStep[] } | null;
    const [stringArtInfo, setStringArtInfo] = useState<StringArtInfo | null>(stringArtData?.info ?? null);
    const [stringArtSteps, setStringArtSteps] = useState<StringArtStep[]>(stringArtData?.steps ?? []);
    useEffect(() => {
        const handler = (event: Event) => {
            const fileUploadedEvent = event as FileUploadedEvent;
            const reader = new FileReader();
            reader.readAsText(fileUploadedEvent.file, "utf-8")
            reader.onload = () => {
                const { parameters, paths } = JSON.parse(reader.result as string);
                const fileInfo = {
                    fileName: fileUploadedEvent.file.name,
                    pins: parameters.pins,
                    lines: parameters.lines,
                    backgroundColor: parameters.backgroundColor,
                    lineWeight: parameters.lineWeight,
                    lineOpacity: parameters.lineOpacity
                } as StringArtInfo;
                const fileSteps = (paths as { from: number, to: number }[]).map((path) => { return { from: path.from, to: path.to } as StringArtStep })
                saveStringArtData(fileInfo, fileSteps).then(() => {
                    setStringArtInfo(fileInfo);
                    setStringArtSteps(fileSteps);
                })
            }
        }
        document.addEventListener(FileUploadedEvent.name, handler);
        return () => {
            document.removeEventListener(FileUploadedEvent.name, handler);
        }
    }, []);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StringArtInfoContext value={stringArtInfo}>
                <StringArtStepsContext value={stringArtSteps}>
                    {children}
                </StringArtStepsContext>
            </StringArtInfoContext>
        </Suspense>
    )
}