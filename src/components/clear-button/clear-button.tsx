import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import { use, useState } from "react";
import { StringArtInfoContext } from "../../contexts";
import { clearSteps } from "../../data/steps-count";
import { clearData } from "../../data/steps-file";
import { useTranslation } from "react-i18next";

export type ClearButtonProps = {
    onClearedData?: () => void,
    className?: string
}

export default function ClearButton({ onClearedData, className }: ClearButtonProps) {
    const [t] = useTranslation();
    const [haveData, setHaveData] = useState(use(StringArtInfoContext) ? true : false)
    const clearStringArtData = async () => {
        await clearData();
        clearSteps();
        setHaveData(false);
        if (onClearedData) onClearedData()
    }
    return <Button disabled={!haveData} onClick={clearStringArtData} iconLeft={faTrash} label={t("toolbar.clearStringArtButton")} variant="tertiary" className={className}></Button>
}