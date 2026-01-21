import { use, useEffect, useRef, useState } from "react"
import { StringArtStepsContext } from "../../contexts"
import styles from "./step-viewer.module.css"
import { saveStep } from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { StringArtStep } from "../../@types/string-art-step";
import { AnimatePresence, motion, useMotionValue } from 'motion/react'

export default function StepViewer({ step = 0, stepsData }: { step?: number, stepsData?: StringArtStep[] }) {
    const steps = stepsData ?? use(StringArtStepsContext);
    const [currentStep, setCurrentStep] = useState(step);
    const direction = useMotionValue<1 | -1>(1);
    const animating = useRef(false)
    const previousButton = () => {
        if (animating.current) return;
        setCurrentStep(currentStep => Math.max(currentStep - 1, 0));
        direction.jump(-1, true)
    }
    const nextButton = () => {
        if (animating.current) return;
        setCurrentStep(currentStep => Math.min(currentStep + 1, steps.length - 1));
        direction.jump(1, true)
    }
    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && currentStep > 0) {
                previousButton();
                return;
            }
            if (e.key === "ArrowRight" && currentStep < steps.length - 1) {
                nextButton();
                return;
            }
        }
        window.addEventListener("keydown", keyboardHandler);
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        }

    }, [currentStep]);
    useEffect(() => {
        saveStep(currentStep);
    }, [currentStep]);

    return (
        <div className={styles.viewer}>
            <motion.div initial={{ y: -40 }} animate={{ y: 0 }} transition={{ type: "spring", bounce: 0.30, duration: 0.25 }} className={styles.stepCounter}>
                <span>Step Nº</span>
                <motion.span key={currentStep} initial={{ scale: 0.6 }} animate={{ scale: 1 }} layout>{currentStep + 1}</motion.span>
            </motion.div>
            <div className={styles.stepControls}>
                <button disabled={currentStep <= 0} onClick={previousButton}><FontAwesomeIcon icon={faAngleLeft} /></button>
                <AnimatePresence initial={false} mode="popLayout" >
                    <motion.div key={currentStep} className={styles.step}
                        initial={{ opacity: 1, x: direction.get() * 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction.get() * -65 }}
                        transition={{ type: "spring", bounce: 0.25, visualDuration: 0.3 }}
                        onAnimationStart={() => animating.current = true} onAnimationComplete={() => animating.current = false}>
                        <motion.span className={styles.from}>{steps[currentStep].from + 1}</motion.span>
                        <motion.span className={styles.arrow}>→</motion.span>
                        <motion.span className={styles.to}>{steps[currentStep].to + 1}</motion.span>
                    </motion.div>
                </AnimatePresence>
                <button disabled={currentStep >= steps.length - 1} onClick={nextButton}><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
        </div>
    )
}

