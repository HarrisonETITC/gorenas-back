import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { EmployeeModel } from "@Domain/models/employee.model";
import { Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { EmployeeBuilder } from "@Domain/models/builders/employee.builder";
import { AppUtil } from "@utils/app.util";

@Injectable()
export class EmployeeEntityMapper implements EntityMapperPort<EmployeeModel, EmployeeEntity, EmployeeModelView> {
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
            salary: domain.salary?? null,
            state: domain.state?? null
        };
    }
    fromDomainToMv(domain: EmployeeModel, extra?: Map<string, string>): EmployeeModelView {
        return {
            id: domain.id ?? null,
            name: extra?.get('name')?? null,
            user: extra?.get('user')?? null,
            branch: extra?.get('branch')?? null,
            sales: AppUtil.findNumberField(extra, 'sales'),
            salesAmmounth: AppUtil.findNumberField(extra, 'salesAmmounth')
        };
    }
}