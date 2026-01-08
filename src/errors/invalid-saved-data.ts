export class InvalidSavedDataError extends Error {
    constructor() {
        super("The saved data is corrupted.");
        this.name = InvalidSavedDataError.name;
    }
}