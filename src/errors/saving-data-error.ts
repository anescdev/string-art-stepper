export class SavingDataError extends Error {
    constructor() {
        super('An error occurred while saving the string art data.');
        this.name = SavingDataError.name;
    }
}