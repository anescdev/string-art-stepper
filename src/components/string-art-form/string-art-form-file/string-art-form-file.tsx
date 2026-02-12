import { faCircleXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./string-art-form-file.module.css";

type StringArtFormFileProps = {
    file: File
    onClickDelete?: () => void
}

export default function StringArtFormFile({ file, onClickDelete }: StringArtFormFileProps) {
    return (
        <article className={style.fileItem}>
            <span className={style.delete} onClick={onClickDelete}><FontAwesomeIcon icon={faCircleXmark}/></span>
            <FontAwesomeIcon icon={faFile} size="6x" />
            <h2>{file.name}</h2>
        </article>
    );
}