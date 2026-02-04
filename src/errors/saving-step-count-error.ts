export class SavingStepCountError extends Error {
    constructor() {
        super('An error occurred while saving the step count. Maybe the value is negative, or not an integer.');
        this.name = SavingStepCountError.name;
    }
}