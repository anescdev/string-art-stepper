import { useEffect, useRef, useState } from "react"
import { FileUploadedEvent } from "../../events/file-uploaded";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./string-art-form.module.css";
import DragArea from "../drag-area/drag-area";
import { useTranslation } from "react-i18next";

export default function StringArtForm() {
  const [t] = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;
    document.dispatchEvent(new FileUploadedEvent(e.currentTarget.files.item(0)!))
  }
  const onDropFiles = (file: File[]) => {
    document.dispatchEvent(new FileUploadedEvent(file.at(0)!))
  }
  const uploadFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.showPicker();
    setDisabled(true);
  }

  return (
    <DragArea disabled={disabled} onDropFiles={onDropFiles} accept={["application/json"]}>
      <article className={style.stringArtForm}>
        <FontAwesomeIcon icon={faUpload} size="6x" />
        <h2>{t("fileForm.label")}</h2>
        <p>{t("fileForm.smallLabel")}</p>
        <input type="file" ref={fileInputRef} className={style.hide} onChange={onChangeFile} accept="application/json" />
        <Button onClick={uploadFile} iconLeft={faUpload} label={t("fileForm.buttonLabel")} />
      </article>
    </DragArea>
  );
}
