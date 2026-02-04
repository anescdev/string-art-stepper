import { use } from "react";

import StepViewer from "@/components/step-viewer/step-viewer";
import StringArtForm from "@/components/string-art-form/string-art-form";
import { useStepCount } from "@/hooks/use-step-count/use-step-count";
import { StringArtInfoContext } from "@/contexts/string-art-info";

export default function MainPage() {
    const step = useStepCount();
    const hasData = use(StringArtInfoContext) !== null;
    if (hasData) 
        return <StepViewer initialStepIndex={step} />
    return <StringArtForm />
}