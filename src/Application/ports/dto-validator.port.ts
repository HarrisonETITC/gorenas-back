import { Type } from "@nestjs/common";

export interface DtoValidatorPort {
    validate(data: any, type: Type<any>): Promise<void>;
    getSchemaByType(type: Type<any>): Promise<any>;
}