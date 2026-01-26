import { use, useEffect, useRef, useState } from "react"
import { StringArtStepsContext } from "../../contexts"
import styles from "./step-viewer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import type { StringArtStep } from "../../@types/string-art-step";
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { saveStep } from "../../data/steps-count";
import { useTranslation } from "react-i18next";

export type StepViewerProps = {
    step?: number,
    stepsData?: StringArtStep[]
}

export default function StepViewer({ step = 0, stepsData }: StepViewerProps) {
    const steps = stepsData ?? use(StringArtStepsContext);
    const [t] = useTranslation();
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
                <span>{t("stepViewer.stepsLabel")}</span>
                <motion.span key={currentStep} initial={{ scale: 0.6 }} animate={{ scale: 1 }} layout>{currentStep + 1}</motion.span>
            </motion.div>
            <div className={styles.stepControls}>
                <motion.button
                    disabled={currentStep <= 0}
                    onClick={previousButton}
                    aria-label={t("stepViewer.previousStepButton")}
                    className={styles.previousButton}
                    whileTap={{scale: 0.9}}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </motion.button>
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
                <motion.button
                    disabled={currentStep >= steps.length - 1}
                    onClick={nextButton}
                    aria-label={t("stepViewer.nextStepButton")}
                    className={styles.nextButton}
                    whileTap={{scale: 0.9}}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </motion.button>
            </div>
        </div>
    )
}

