import { use } from "react";
import { StringArtInfoContext } from "@/contexts/string-art-info";
import { ClearedDataEvent } from "@/events/cleared-data";
import ClearButton from "@/components/clear-button/clear-button";
import MetaInfo from "@/components/metainfo/metainfo";
import styles from "./toolbar.module.css"

export default function Toolbar() {
    const data = use(StringArtInfoContext) ? true : false
    const onClearedData = () => {
        window.dispatchEvent(new ClearedDataEvent());
    }
    return data && (
    <section className={styles.toolbar}>
        <ClearButton onClearedData={onClearedData}/>
        <MetaInfo />
    </section>)
}