import { useRef } from "react"
import { FileUploadedEvent } from "../../events/file-uploaded";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./string-art-form.module.css";

export default function StringArtForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;
    document.dispatchEvent(new FileUploadedEvent(e.currentTarget.files.item(0)!))
  }
  const uploadFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.showPicker();
  }

  return (
    <article className={style.stringArtForm}>
      <FontAwesomeIcon icon={faUpload} size="6x" />
      <h2>Drag the JSON file here</h2>
      <p>or click here for select the file</p>
      <input type="file" ref={fileInputRef} className={style.hide} onChange={onChangeFile} />
      <Button onClick={uploadFile} iconLeft={faUpload} label="Upload file"/>
    </article>
  );
}
