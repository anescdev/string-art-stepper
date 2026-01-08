import { use, useRef } from "react"
import { StringArtInfoContext } from "../../contexts"
import { FileUploadedEvent } from "../../events/file-uploaded";

export default function StringArtForm() {
  const data = use(StringArtInfoContext)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;
    document.dispatchEvent(new FileUploadedEvent(e.currentTarget.files.item(0)!))
  }
  const uploadFile = () => {
    if(!fileInputRef.current) return;
    fileInputRef.current.showPicker();
  }

  if (!data) {
    return (<>
      <input type="file" ref={fileInputRef} className="hide" onChange={onChangeFile}/>
      <button onClick={uploadFile} >Upload file</button>
    </>);
  }
  return <div>{data.fileName}</div>
}