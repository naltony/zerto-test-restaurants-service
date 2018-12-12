export class ValidationResponse {

    constructor(public isValid: boolean, public responseCode: number, public message: string) {}
}