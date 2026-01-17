import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./button.module.css";
import type { ButtonStyle } from "../../@types/button-style";

export default function Button({ onClick, icon, label, buttonStyle = "primary" }: { onClick?: () => void, icon?: IconDefinition, label?: string, buttonStyle?: ButtonStyle }) {
    return <button onClick={onClick} className={`${styles.button} ${styles[buttonStyle]}`}>{icon && <FontAwesomeIcon icon={icon} />}{label}</button>
}