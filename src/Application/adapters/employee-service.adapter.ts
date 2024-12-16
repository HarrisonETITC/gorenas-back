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
import { GetAvailableCanSeePort } from "@Application/ports/cansee-available.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export class EmployeeServiceAdapter extends GeneralServiceAdapter<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto, EmployeeModelView> implements GetAvailableCanSeePort<EmployeeModelView> {
    constructor(
        @Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: GeneralRepositoryPort<EmployeeModel> & GenerateModelViewPort<EmployeeModel, EmployeeModelView> & GetAvailableCanSeePort<EmployeeModelView>,
        @Inject(EMPLOYEE_DTO_MAPPER) private readonly employeeMapper: DtoMapperPort<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto>
    ) {
        super(employeeRepository, employeeMapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return await this.employeeRepository.getAvailable(params);
    }
    async getCanSee(params: BasicSearchParams): Promise<EmployeeModelView[]> {
        return await this.employeeRepository.getCanSee(params);
    }
}