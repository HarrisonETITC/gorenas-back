import { DtoValidatorPort } from "@Application/ports/dto-validator.port";
import { BranchCreateDto } from "@Domain/models/create-dto/branch-create.dto";
import { Injectable, Type } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { BranchCreateSchema } from "./branch/branch-create.schema";
import { AppUtil } from "@Application/core/utils/app.util";
import { UserIdStringDto } from "@Domain/models/general/dto/user-id-string.dto";
import { UserIdStringSchema } from "./general/user-id-string.schema";
import { BranchUpdateDto } from "@Domain/models/update-dto/branch-update.dto";
import { BranchUpdateSchema } from "./branch/branch-update.schema";
import { EmployeeCreateDto } from "@Domain/models/create-dto/employee-create.dto";
import { EmployeeCreateSchema } from "./employee/employee-create.schema";
import { EmployeeUpdateDto } from "@Domain/models/update-dto/employee-update.dto";
import { EmployeeUpdateSchema } from "./employee/employee-update.schema";
import { PersonCreateDto } from "@Domain/models/create-dto/person-create.dto";
import { PersonCreateSchema } from "./person/person-create.schema";
import { PersonUpdateDto } from "@Domain/models/update-dto/person-update.dto";
import { PersonUpdateSchema } from "./person/person-update.schema";
import { RestaurantCreateDto } from "@Domain/models/create-dto/restaurant-create.dto";
import { RestaurantUpdateDto } from "@Domain/models/update-dto/restaurant-update.dto";
import { RestaurantCreateSchema } from "./restaurant/restaurant-create.schema";
import { RestaurantUpdateSchema } from "./restaurant/restaurant-update.schema";
import { RoleCreateDto } from "@Domain/models/create-dto/role-create.dto";
import { RoleUpdateDto } from "@Domain/models/update-dto/role-update.dto";
import { RoleCreateSchema } from "./role/role-create.schema";
import { RoleUpdateSchema } from "./role/role-update.schema";
import { SaleCreateDto } from "@Domain/models/create-dto/sale-create.dto";
import { SaleUpdateDto } from "@Domain/models/update-dto/sale-update.dto";
import { SaleCreateSchema } from "./sale/sale-create.schema";
import { SaleUpdateSchema } from "./sale/sale-update.schema";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserCreateSchema } from "./user/user-create.schema";
import { UserUpdateSchema } from "./user/user-update.schema";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { BasicSearchSchema } from "./general/basic-search.schema";
import { ValidationException } from "@Application/api/exceptions/validation.exception";

@Injectable()
export class ZodValidatorAdapter implements DtoValidatorPort {
    private readonly schemas = new Map<Type<any>, ZodSchema<any>>();

    constructor() {
        this.schemas.set(UserIdStringDto, UserIdStringSchema);
        this.schemas.set(BranchCreateDto, BranchCreateSchema);
        this.schemas.set(BranchUpdateDto, BranchUpdateSchema);
        this.schemas.set(EmployeeCreateDto, EmployeeCreateSchema);
        this.schemas.set(EmployeeUpdateDto, EmployeeUpdateSchema);
        this.schemas.set(PersonCreateDto, PersonCreateSchema);
        this.schemas.set(PersonUpdateDto, PersonUpdateSchema);
        this.schemas.set(RestaurantCreateDto, RestaurantCreateSchema);
        this.schemas.set(RestaurantUpdateDto, RestaurantUpdateSchema);
        this.schemas.set(RoleCreateDto, RoleCreateSchema);
        this.schemas.set(RoleUpdateDto, RoleUpdateSchema);
        this.schemas.set(SaleCreateDto, SaleCreateSchema);
        this.schemas.set(SaleUpdateDto, SaleUpdateSchema);
        this.schemas.set(UserCreateDto, UserCreateSchema);
        this.schemas.set(UserUpdateDto, UserUpdateSchema);
        this.schemas.set(BasicSearchParams, BasicSearchSchema);
    }

    async validate(data: any, type: Type<any>): Promise<void> {
        if (AppUtil.verifyEmpty(this.schemas.get(type)))
            throw new Error(`No existe un validador de zod definido para la clase '${type.name}'`);

        try {
            await this.schemas.get(type).parse(data);
        } catch (e) {
            if (e instanceof ZodError) {
                throw new ValidationException('', e.errors.map(e => e.message));
            }

            throw new Error(e.message);
        }
    }

    async getSchemaByType(type: Type<any>): Promise<any> {
        return this.schemas.get(type);
    }
}