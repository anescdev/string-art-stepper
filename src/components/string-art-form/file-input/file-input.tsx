import Button from "@/components/button/button";
import DragArea from "@/components/drag-area/drag-area";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./file-input.module.css";

type FileInputProps = {
    onFileUploaded?: (file: File[]) => void
}

export default function FileInput({ onFileUploaded }: FileInputProps) {
    const [t] = useTranslation();
    const [disabled, setDisabled] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.showPicker();
        setDisabled(true);
    }

    useEffect(() => {
        const fileInput = fileInputRef.current;
        const onCancel = () => {
            setDisabled(false);
        }
        fileInput?.addEventListener("cancel", onCancel);
        return () => {
            fileInput?.removeEventListener("cancel", onCancel);
        }
    }, []);

    return (
        <DragArea disabled={disabled} onDropFiles={onFileUploaded} accept={["application/json"]} className={style.fileInput}>
            <FontAwesomeIcon icon={faFileImport} size="6x" />
            <h2>{t("fileForm.label")}</h2>
            <p>{t("fileForm.smallLabel")}</p>
            <input type="file" ref={fileInputRef} className={style.hide} onChange={(e) => onFileUploaded && onFileUploaded(Array.from(e.target.files || []))} accept="application/json" />
            <Button onClick={uploadFile} iconLeft={faFileImport} label={t("fileForm.selectFile")} />
        </DragArea>
    )
}