import { DtoValidatorPort } from "@Application/ports/dto-validator.port";
import { Injectable } from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodValidatorAdapter implements DtoValidatorPort {
    validate<T>(data: T, schema: ZodSchema<T>): Promise<void> {
        try {
            schema.parse(data);
        } catch (error) {
            throw new Error(error);
        }

        return;
    }
}