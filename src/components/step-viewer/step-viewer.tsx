import { use, useEffect, useState } from "react"
import { StringArtStepsContext } from "../../contexts"
import styles from "./step-viewer.module.css"
import { saveStep } from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { StringArtStep } from "../../@types/string-art-step";

export default function StepViewer({ step = 0, stepsData }: { step?: number, stepsData?: StringArtStep[] }) {
    const steps = stepsData ?? use(StringArtStepsContext);
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
            <div className={styles.stepCounter}>
                <span>Step Nº</span>
                <span>{currentStep + 1}</span>
            </div>
            <div className={styles.stepControls}>
                <button disabled={currentStep === 0} onClick={previousButton}><FontAwesomeIcon icon={faAngleLeft}/></button>
                <div className={styles.step}>
                    <span>{steps[currentStep].from + 1}</span>
                    <span>→</span>
                    <span>{steps[currentStep].to + 1}</span>
                </div>
                <button disabled={currentStep === steps.length - 1} onClick={nextButton}><FontAwesomeIcon icon={faAngleRight}/></button>
            </div>
        </div>
    )
}

