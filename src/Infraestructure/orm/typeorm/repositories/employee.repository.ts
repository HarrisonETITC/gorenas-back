import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { EmployeeModel } from "@Domain/models/employee.model";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { DataSource } from "typeorm";
import { EMPLOYEE_ENTITY_MAPPER } from "@Application/config/inject-tokens/employee.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";

@Injectable()
export class EmployeeRepository extends GeneralRepository<EmployeeModel, EmployeeEntity, EmployeeModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(EMPLOYEE_ENTITY_MAPPER) protected mapper: EntityMapperPort<EmployeeModel, EmployeeEntity, EmployeeModelView>
    ) {
        super(source, EmployeeEntity, mapper);
    }
}