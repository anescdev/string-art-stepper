import { use } from "react";

import StepViewer from "@/components/step-viewer/step-viewer";
import StringArtForm from "@/components/string-art-form/string-art-form";
import { useStepCount } from "@/hooks/use-step-count/use-step-count";
import { StringArtInfoContext } from "@/contexts/string-art-info";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function MainPage() {
    const step = useStepCount();
    const [t] = useTranslation();
    const hasData = use(StringArtInfoContext) !== null;

    const onFinished = () => toast.success(t("notifications.done.finished"), { toastId: 'finished-art' });

    if (hasData)
        return <StepViewer initialStepIndex={step} onFinished={onFinished} />
    return <StringArtForm />
}