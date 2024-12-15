import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { EmployeeModel } from "@Domain/models/employee.model";
import { Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { EmployeeBuilder } from "@Domain/models/builders/employee.builder";
import { AppUtil } from "@Application/core/utils/app.util";
import { EmployeeTransformParams } from "@Application/core/params/transform/employee-transform.params";

@Injectable()
export class EmployeeEntityMapper implements EntityMapperPort<EmployeeModel, EmployeeEntity, EmployeeModelView, EmployeeTransformParams> {
    fromEntityToDomain(entity: EmployeeEntity): EmployeeModel {
        return new EmployeeBuilder()
            .setId(entity.id ?? null)
            .setSalary(entity.salary ?? null)
            .setState(entity.state ?? null)
            .build();
    }
    fromDomainToEntity(domain: EmployeeModel): EmployeeEntity {
        return {
            id: domain.id ?? null,
            salary: domain.salary ?? null,
            state: domain.state ?? null
        };
    }
    fromDomainToMv(domain: EmployeeModel, extra?: EmployeeTransformParams): EmployeeModelView {
        return {
            id: domain.id ?? null,
            name: extra?.name ?? null,
            user: extra?.user ?? null,
            branch: extra?.branch ?? null,
            sales: extra?.sales ?? null,
            salesAmmounth: extra?.salesAmmounth ?? null
        };
    }
}