import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { EmployeeModel } from "@Domain/models/employee.model";
import { EmployeeCreateDto } from "@Domain/models/create-dto/employee-create.dto";
import { EmployeeUpdateDto } from "@Domain/models/update-dto/employee-update.dto";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { EMPLOYEE_SERVICE } from "@Application/config/inject-tokens/employee.tokens";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { ROUTE_EMPLOYEE } from "@Application/api/api.routes";

@Controller(ROUTE_EMPLOYEE)
export class EmployeeController extends GeneralControllerAdapter(EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto, EmployeeModelView) {
    constructor(
        @Inject(EMPLOYEE_SERVICE) private readonly employeeService: GeneralServicePort<EmployeeModel, EmployeeCreateDto, EmployeeUpdateDto> & GenerateModelViewPort<EmployeeModel, EmployeeModelView>
    ) {
        super(employeeService)
    }
}