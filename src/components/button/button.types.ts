import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ButtonProps = {
    onClick?: () => void
    iconLeft?: IconDefinition
    iconRight?: IconDefinition
    label?: string
    variant?: ButtonVariant
    className?: string
    disabled?: boolean
}