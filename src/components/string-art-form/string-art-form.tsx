import { useState } from "react"
import { useTranslation } from "react-i18next";

import Button from "@/components/button/button";
import { FileUploadedEvent } from "@/events/file-uploaded";

import style from "./string-art-form.module.css";
import FileInput from "./file-input/file-input";
import StringArtFormFile from "./string-art-form-file/string-art-form-file";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function StringArtForm() {
  const [t] = useTranslation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onUploadedFile = () => {
    document.dispatchEvent(new FileUploadedEvent(uploadedFile!));
  }

  if (uploadedFile) {
    return (
      <article className={style.stringArtForm}>
        <StringArtFormFile file={uploadedFile} onClickDelete={() => setUploadedFile(null)}/>
        <Button onClick={onUploadedFile} label={t("fileForm.uploadFile")} iconLeft={faFileArrowUp}/>
      </article>
    );
  }
  return (
    <article className={style.stringArtForm}>
      <FileInput onFileUploaded={files => setUploadedFile(files.at(0) || null)} />
    </article>
  );
}
