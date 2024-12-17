import { HttpStatus, NotAcceptableException } from "@nestjs/common";

export class ValidationException extends NotAcceptableException {
    errors: Array<string>;

    constructor(message: string, errors: Array<string>) {
        super({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            error: 'Validation Error',
            message,
            errors
        });
        this.errors = errors;
    }
}