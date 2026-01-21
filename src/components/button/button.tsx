import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./button.module.css";
import type { ButtonStyle } from "../../@types/button-style";
import { motion } from "motion/react"

export default function Button({ onClick, icon, label, buttonStyle = "primary" }: { onClick?: () => void, icon?: IconDefinition, label?: string, buttonStyle?: ButtonStyle }) {
    return (
        <motion.button
            onClick={onClick}
            className={`${styles.button} ${styles[buttonStyle]}`}
            whileTap={{ scale: 0.98 }}
            transition={
                { 
                    type: "spring",
                    visualDuration: 0.15,
                    bounce: 0.25
                    
                }
            }
        >
            {icon && <FontAwesomeIcon icon={icon} />}{label}
        </motion.button>
    )
}