import { use, useCallback, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useTranslation } from "react-i18next";

import { saveStepCount } from "@/data/steps-count"
import { StringArtStepsContext } from "@/contexts/string-art-steps";;

import styles from "./step-viewer.module.css"

export type StepViewerProps = {
    initialStepIndex: number,
    onFinished?: () => void
}

export default function StepViewer({ initialStepIndex = 0, onFinished }: StepViewerProps) {
    const steps = use(StringArtStepsContext);
    const [currentStep, setCurrentStep] = useState(Math.min(Math.max(initialStepIndex, 0), steps.length - 1));
    const canFinish = currentStep === steps.length - 1;
    const [t] = useTranslation();
    const direction = useMotionValue<1 | -1>(1);
    const animating = useRef(false)

    const previousButton = useCallback(() => {
        if (animating.current) return;
        setCurrentStep(currentStep => Math.max(currentStep - 1, 0));
        direction.jump(-1, true)
    }, [direction]);
    const nextButton = useCallback(() => {
        if (animating.current) return;
        setCurrentStep(currentStep => Math.min(currentStep + 1, steps.length - 1));
        direction.jump(1, true)
    }, [direction, steps.length]);
    const finishStringArt = useCallback(() => {
        if (onFinished) onFinished();
    }, [onFinished]);

    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && currentStep > 0) {
                previousButton();
                return;
            }
            if (e.key === "ArrowRight") {
                if (canFinish) {
                    finishStringArt()
                    return
                }
                nextButton()
            }
        }
        window.addEventListener("keydown", keyboardHandler);
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        }

    }, [currentStep, canFinish, steps.length, previousButton, nextButton, finishStringArt]);
    useEffect(() => {
        saveStepCount(currentStep);
    }, [currentStep]);

    if (steps.length === 0) return null;
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
                    whileTap={{ scale: 0.9 }}>
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
                    onClick={canFinish ? finishStringArt : nextButton}
                    aria-label={t(canFinish ? "stepViewer.finishButton" : "stepViewer.nextStepButton")}
                    className={canFinish ? styles.finishButton : styles.nextButton}
                    whileTap={{ scale: 0.9 }}>
                    <FontAwesomeIcon icon={canFinish ? faCircleCheck : faAngleRight} />
                </motion.button>
            </div>
        </div>
    )
}

