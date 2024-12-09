import { Type } from "@nestjs/common";

export interface ValidationServicePort {
    validate (data: any, type: Type<any>): Promise<void>;
    validateExistingSchema(type: Type<any>): Promise<boolean>;
}