import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./button.module.css";
import { motion } from "motion/react"
import type { ButtonProps } from "./button.types";

export default function Button({ onClick, iconLeft, iconRight, label, variant: buttonStyle = "primary", className, disabled }: ButtonProps) {
    return (
        <motion.button
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${styles[buttonStyle]} ${className ?? ""}`}
            whileTap={{ scale: 0.98 }}
            transition={
                {
                    type: "spring",
                    visualDuration: 0.15,
                    bounce: 0.25
                }
            }
        >
            {iconLeft && <FontAwesomeIcon icon={iconLeft} />}{label}{iconRight && <FontAwesomeIcon icon={iconRight} />}
        </motion.button>
    )
}