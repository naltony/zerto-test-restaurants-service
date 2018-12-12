import { ValidationResponse } from "./validation-response";

export class ValidationError extends Error {

    constructor(public msg: string, public validationResponse: ValidationResponse) {
        super(msg);
    }
}