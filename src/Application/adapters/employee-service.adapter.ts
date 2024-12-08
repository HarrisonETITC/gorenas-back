import { EmployeeModel } from "@Domain/models/employee.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { EMPLOYEE_DTO_MAPPER, EMPLOYEE_REPOSITORY } from "@Application/config/inject-tokens/employee.tokens";
import { Inject } from "@nestjs/common";
import { EmployeeCreateDto } from "@Domain/models/create-dto/employee-create.dto";
import { EmployeeUpdateDto } from "@Domain/models/update-dto/employee-update.dto";

export class EmployeeServiceAdapter extends GeneralServiceAdapter<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto, EmployeeModelView> {
    constructor(
        @Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: GeneralRepositoryPort<EmployeeModel> & GenerateModelViewPort<EmployeeModel, EmployeeModelView>,
        @Inject(EMPLOYEE_DTO_MAPPER) private readonly employeeMapper: DtoMapperPort<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto>
    ) {
        super(employeeRepository, employeeMapper);
    }
}