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
    const onKeyPress = (e: React.KeyboardEvent) => {
        console.log(e);
        if (e.key === "ArrowLeft") {
            previousButton();
        } else if (e.key === "ArrowRight") {
            nextButton();
        }
    }

    return (
        <div className={styles.viewer} onKeyDown={onKeyPress}>
            <span className={styles.step}>{steps[currentStep].from + 1} → {steps[currentStep].to + 1}</span>
            <span><button disabled={currentStep === 0} onClick={previousButton}>Previous</button>
                <button disabled={currentStep === steps.length - 1} onClick={nextButton}>Next</button></span>
        </div>
    )
}

