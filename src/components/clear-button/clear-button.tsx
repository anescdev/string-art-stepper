import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { use, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/button";
import { StringArtInfoContext } from "@/contexts/string-art-info";
import { clearStepsCount } from "@/data/steps-count";
import { clearData } from "@/data/steps-file";
import { toast } from "react-toastify";

export type ClearButtonProps = {
    onClearedData?: () => void,
    className?: string
}

export default function ClearButton({ onClearedData, className }: ClearButtonProps) {
    const [t] = useTranslation();
    const haveData = use(StringArtInfoContext) ? true : false
    const [isClearing, setIsClearing] = useState(false);
    const clearStringArtData = async () => {
        setIsClearing(true);
        try {
            await clearData();
            clearStepsCount();
            if (onClearedData) onClearedData()
        } catch {
            toast.error(t("notification.error.clearStringArtErrorToast"));
        } finally {
            setIsClearing(false);
        }
    }
    return <Button
        disabled={!haveData || isClearing}
        onClick={clearStringArtData}
        iconLeft={faTrash}
        label={t("toolbar.clearStringArtButton")}
        variant="tertiary"
        className={className} />
}