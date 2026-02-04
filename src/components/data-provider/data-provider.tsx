import { Suspense, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { loadedStringArtData, saveStringArtData } from "@/data/steps-file";
import { FileUploadedEvent } from "@/events/file-uploaded";
import { ClearedDataEvent } from "@/events/cleared-data";
import { StringArtInfoContext } from "@/contexts/string-art-info";
import { StringArtStepsContext } from "@/contexts/string-art-steps";
import type { StringArtInfo } from "@/types/string-art-info";
import type { StringArtStep } from "@/types/string-art-step";

export type DataProviderProps = { children: React.ReactNode }

export default function DataProvider({ children }: DataProviderProps) {
    const stringArtData = use(loadedStringArtData)
    const [t] = useTranslation();
    const [stringArtInfo, setStringArtInfo] = useState<StringArtInfo | null>(stringArtData?.info ?? null);
    const [stringArtSteps, setStringArtSteps] = useState<StringArtStep[]>(stringArtData?.steps ?? []);

    useEffect(() => {
        const handler = (event: Event) => {
            const fileUploadedEvent = event as FileUploadedEvent;
            const reader = new FileReader();
            reader.readAsText(fileUploadedEvent.file, "utf-8")
            reader.onload = () => {
                let fileInfo: StringArtInfo;
                let fileSteps: StringArtStep[];
                try {
                    const { parameters, paths } = JSON.parse(reader.result as string);
                    fileInfo = {
                        fileName: fileUploadedEvent.file.name,
                        pins: parameters.pins,
                        lines: parameters.lines,
                        backgroundColor: parameters.backgroundColor,
                        lineWeight: parameters.lineWeight,
                        lineOpacity: parameters.lineOpacity
                    };
                    fileSteps = (paths as { from: number, to: number }[]).map((path) => { return { from: path.from, to: path.to } as StringArtStep });
                } catch {
                    toast.error(t("notifications.error.parsingFile"), { type: "error" });
                    return;
                }
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
    }, [t]);
    useEffect(() => {
        const handler = () => {
            setStringArtInfo(null);
            setStringArtSteps([]);
            toast.info(t("notifications.info.dataCleared"));
        }
        window.addEventListener(ClearedDataEvent.name, handler);
        return () => {
            window.removeEventListener(ClearedDataEvent.name, handler);
        }
    }, [t])
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