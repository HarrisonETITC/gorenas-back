import { DtoValidatorPort } from "@Application/ports/dto-validator.port";
import { BranchCreateDto } from "@Domain/models/create-dto/branch-create.dto";
import { Injectable, Type } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { BranchCreateSchema } from "./branch/branch-create.schema";
import { AppUtil } from "@Application/core/utils/app.util";
import { IdStringDto } from "@Domain/models/general/dto/id-string.dto";
import { IdStringSchema } from "./general/id-string.schema";
import { BranchUpdateDto } from "@Domain/models/update-dto/branch-update.dto";
import { BranchUpdateSchema } from "./branch/branch-update.schema";
import { EmployeeCreateDto } from "@Domain/models/create-dto/employee-create.dto";
import { EmployeeCreateSchema } from "./employee/employee-create.schema";

@Injectable()
export class ZodValidatorAdapter implements DtoValidatorPort {
    private readonly schemas = new Map<Type<any>, ZodSchema<any>>();

    constructor() {
        this.schemas.set(IdStringDto, IdStringSchema);
        this.schemas.set(BranchCreateDto, BranchCreateSchema);
        this.schemas.set(BranchUpdateDto, BranchUpdateSchema);
        this.schemas.set(EmployeeCreateDto, EmployeeCreateSchema);
    }

    async validate(data: any, type: Type<any>): Promise<void> {
        if (AppUtil.verifyEmpty(this.schemas.get(type)))
            throw new Error(`No existe un validador de zod definido para la clase '${type.name}'`);

        try {
            await this.schemas.get(type).parse(data);
        } catch (e) {
            if (e instanceof ZodError) {
                const errorMessages = e.errors.map(error => error.message).join(', ');
                throw new Error(errorMessages);
            }

            throw new Error(e.message);
        }
    }

    async getSchemaByType(type: Type<any>): Promise<any> {
        return this.schemas.get(type);
    }
}