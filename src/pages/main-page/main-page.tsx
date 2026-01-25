import { use } from "react";
import { StringArtStepsContext } from "../../contexts";
import StepViewer from "../../components/step-viewer/step-viewer";
import StringArtForm from "../../components/string-art-form/string-art-form";
import { useStepCount } from "../../hooks/useStepCount";

export default function MainPage() {
    const step = useStepCount();
    const data = use(StringArtStepsContext);
    if (data.length > 0) 
        return <StepViewer step={step} stepsData={data} />
    return <StringArtForm />
}