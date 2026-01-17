import { use } from "react";
import { fetchSavedStep } from "../components/step-viewer/helper";
import StepViewer from "../components/step-viewer/step-viewer";
import { StringArtStepsContext } from "../contexts";
import StringArtForm from "../components/string-art-form/string-art-form";

export default function MainPage() {
    const step = fetchSavedStep();
    const data = use(StringArtStepsContext);
    return (<>
        {data.length > 0 ? <StepViewer step={step} stepsData={data}/> : <StringArtForm />}
    </>);
}