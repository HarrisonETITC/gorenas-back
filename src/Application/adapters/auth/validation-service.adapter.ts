import { VALIDATOR } from "@Application/config/inject-tokens/auth.tokens";
import { DtoValidatorPort } from "@Application/ports/dto-validator.port";
import { ValidationServicePort } from "@Application/ports/validation-service.port";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ValidationServiceAdapter implements ValidationServicePort {
    constructor(
        @Inject(VALIDATOR) private readonly validator: DtoValidatorPort
    ) { }

    async validate<T>(data: T, schema: any): Promise<void> {
        await this.validator.validate(data, schema);
    }
}