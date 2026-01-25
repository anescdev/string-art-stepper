import { useRef } from "react"
import { FileUploadedEvent } from "../../events/file-uploaded";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./string-art-form.module.css";
import DragArea from "../drag-area/drag-area";

export default function StringArtForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  }

  return (
    <DragArea onDropFiles={onDropFiles} accept={["application/json"]}>
      <article className={style.stringArtForm}>
        <FontAwesomeIcon icon={faUpload} size="6x" />
        <h2>Drag the JSON file here</h2>
        <p>or click here for select the file</p>
        <input type="file" ref={fileInputRef} className={style.hide} onChange={onChangeFile} accept="application/json"/>
        <Button onClick={uploadFile} iconLeft={faUpload} label="Upload file" />
      </article>
    </DragArea>
  );
}
