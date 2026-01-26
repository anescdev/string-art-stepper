import { use, useRef, useState } from "react"
import { StringArtInfoContext } from "../../contexts"
import styles from "./metainfo.module.css"
import { faAngleDown, faAngleUp, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { AnimatePresence, motion, type Variants } from "motion/react"
import Button from "../button/button"
import { useTranslation } from "react-i18next"

type MetaInfoProps = {
    className?: string
}

const animationVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0.1 },
    visible: { scaleY: 1, originY: 0, opacity: 1 }
}

export default function MetaInfo({ className }: MetaInfoProps) {
    const metaData = use(StringArtInfoContext);
    const [showInfo, setShowInfo] = useState(false)
    const sectionRef = useRef<HTMLElement>(null);
    const [t] = useTranslation();

    return (
        <section ref={sectionRef} className={className}>
            <Button onClick={() => setShowInfo(!showInfo)} iconLeft={faInfoCircle} iconRight={showInfo ? faAngleUp : faAngleDown} label={t("toolbar.showMetadataButton")} variant="tertiary"/>
            <AnimatePresence>
                {showInfo && <motion.div className={styles.infoBox}
                    variants={animationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
                >
                    <h3 className={styles.infoBoxTitle}>{t("metadata.title")}</h3>
                    <p><b>{t("metadata.filenameLabel")}</b> {metaData?.fileName}</p>
                    <p><b>{t("metadata.numNailsLabel")}</b> {metaData?.pins}</p>
                    <p><b>{t("metadata.numStepsLabel")}</b> {metaData?.lines}</p>
                </motion.div>}
            </AnimatePresence>
        </section>
    );
}