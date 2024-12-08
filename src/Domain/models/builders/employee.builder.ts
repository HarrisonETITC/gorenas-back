import { IBuilder } from "@Domain/interfaces/builder.interface";
import { EmployeeModel } from "../employee.model";

export class EmployeeBuilder implements IBuilder<EmployeeModel> {
    private employee: EmployeeModel;
    
    constructor() {
        this.reset();
    }
    
    setId(id: number) {
        this.employee.id = id;
        return this;
    }
    setSalary(salary: number) {
        this.employee.salary = salary;
        return this;
    }
    setState(state: string) {
        this.employee.state = state;
        return this;
    }
    build(): EmployeeModel {
        const builded = this.employee;
        this.reset();
        return builded;
    }
    reset(): void {
        this.employee = new EmployeeModel();
    }
}