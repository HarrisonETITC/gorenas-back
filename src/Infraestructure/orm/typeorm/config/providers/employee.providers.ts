import { EMPLOYEE_DTO_MAPPER, EMPLOYEE_ENTITY_MAPPER, EMPLOYEE_REPOSITORY, EMPLOYEE_SERVICE } from "@Application/config/inject-tokens/employee.tokens";
import { Provider } from "@nestjs/common";
import { EmployeeEntityMapper } from "../../mappers/employee-entity.mapper";
import { EmployeeRepository } from "../../repositories/employee.repository";
import { EmployeeDtoMapper } from "@Application/mappers/employee-dto.mapper";
import { EmployeeServiceAdapter } from "@Application/adapters/employee-service.adapter";

export const EmployeeProviders: Array<Provider> = [
    {
        provide: EMPLOYEE_ENTITY_MAPPER,
        useClass: EmployeeEntityMapper
    },
    {
        provide: EMPLOYEE_REPOSITORY,
        useClass: EmployeeRepository
    },
    {
        provide: EMPLOYEE_DTO_MAPPER,
        useClass: EmployeeDtoMapper
    },
    {
        provide: EMPLOYEE_SERVICE,
        useClass: EmployeeServiceAdapter
    }
]