import { use, useEffect, useState } from "react"
import { StringArtStepsContext } from "../../contexts"
import styles from "./step-viewer.module.css"
import { saveStep } from "./helper";

export default function StepViewer({ step = 0 }: { step?: number }) {
    const steps = use(StringArtStepsContext);
    const [currentStep, setCurrentStep] = useState(step);
    useEffect(() => {
        saveStep(currentStep);
    }, [currentStep]);
    const previousButton = () => {
        if (currentStep <= 0) return;
        setCurrentStep(currentStep => currentStep - 1);
    }
    const nextButton = () => {
        if (currentStep >= steps.length - 1) return;
        setCurrentStep(currentStep => currentStep + 1);
    }
    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                previousButton();
            } else if (e.key === "ArrowRight") {
                nextButton();
            }
        }
        window.addEventListener("keydown", keyboardHandler);
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        }
    }, []);

    return (
        <div className={styles.viewer}>
            <span className={styles.step}>Step {currentStep + 1}: {steps[currentStep].from + 1} → {steps[currentStep].to + 1}</span>
            <span><button disabled={currentStep === 0} onClick={previousButton}>Previous</button>
                <button disabled={currentStep === steps.length - 1} onClick={nextButton}>Next</button></span>
        </div>
    )
}

