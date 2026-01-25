import { useState, type DragEvent, type ReactNode } from "react";
import style from "./drag-area.module.css";
type DragAreaProps = {
    children?: ReactNode
    onDropFiles?: (files: File[]) => void
    accept?: string[]
}

export default function DragArea({ children, onDropFiles, accept }: DragAreaProps) {
    const [dragging, setDragging] = useState(false);
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!onDropFiles) return;
        let files = [...e.dataTransfer.files];
        if (files.length < 1) return;
        if (accept && accept.length > 0) {
            files = files.filter(file => accept.includes(file.type));
            if (files.length < 1) return;
        }
        onDropFiles(files)
    }
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    }
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    }
    return (<div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`${style.dragArea} ${dragging ? style.dragging : ""}`}>{children}</div>)
}