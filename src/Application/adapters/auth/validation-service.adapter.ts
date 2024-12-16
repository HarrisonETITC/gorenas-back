import { VALIDATOR } from "@Application/config/inject-tokens/auth.tokens";
import { AppUtil } from "@Application/core/utils/app.util";
import { DtoValidatorPort } from "@Application/ports/dto-validator.port";
import { ValidationServicePort } from "@Application/ports/validation-service.port";
import { BadRequestException, Inject, Injectable, Type } from "@nestjs/common";

@Injectable()
export class ValidationServiceAdapter implements ValidationServicePort {
    constructor(
        @Inject(VALIDATOR) private readonly validator: DtoValidatorPort
    ) { }
    async validate(data: any, type: Type<any>): Promise<void> {
        try {
            await this.validator.validate(data, type);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async validateExistingSchema(type: Type<any>): Promise<boolean> {
        return !AppUtil.verifyEmpty(await this.validator.getSchemaByType(type));
    }
}