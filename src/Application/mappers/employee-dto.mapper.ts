import { EmployeeBuilder } from "@Domain/models/builders/employee.builder";
import { EmployeeCreateDto } from "@Domain/models/create-dto/employee-create.dto";
import { EmployeeModel } from "@Domain/models/employee.model";
import { EmployeeUpdateDto } from "@Domain/models/update-dto/employee-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeeDtoMapper implements DtoMapperPort<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto> {
    fromModelToCreate(base: EmployeeModel, params?: Map<string, string>): EmployeeCreateDto {
        return {
            branch: params?.get('branch') ?? null,
            person: params?.get('person') ?? null,
            salary: base.salary ?? null,
            state: base.state ?? null
        };
    }
    fromModelToUpdate(base: EmployeeModel, params?: Map<string, string>): EmployeeUpdateDto {
        return {
            id: base.id ?? null,
            branch: params?.get('branch') ?? null,
            person: params?.get('person') ?? null,
            salary: base.salary ?? null,
            state: base.state ?? null
        }
    }
    fromCreateToModel(create: EmployeeCreateDto, params?: Map<string, string>): EmployeeModel {
        return new EmployeeBuilder()
            .setId(null)
            .setSalary(create.salary ?? null)
            .setState(create.state ?? null)
            .build();
    }
    fromUpdateToModel(update: EmployeeUpdateDto, params?: Map<string, string>): EmployeeModel {
        return new EmployeeBuilder()
            .setId(update.id ?? null)
            .setSalary(update.salary ?? null)
            .setState(update.state ?? null)
            .build();
    }
}