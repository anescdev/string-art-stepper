export class FileUploadedEvent extends Event {
    file: File;
    constructor(file: File) {
        super(FileUploadedEvent.name);
        this.file = file;
    }
}