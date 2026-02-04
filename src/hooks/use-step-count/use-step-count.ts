import { useEffect, useState } from "react";

import { loadStepsCount } from "@/data/steps-count";
import { ClearedDataEvent } from "@/events/cleared-data";

export function useStepCount() {
    const [savedStep, setSavedStep] = useState<number>(loadStepsCount());
    useEffect(() => {
        const handler = () => {
            setSavedStep(0);
        }
        window.addEventListener(ClearedDataEvent.name, handler);
        return () => {
            window.removeEventListener(ClearedDataEvent.name, handler);
        };
    }, []);
    return savedStep
}