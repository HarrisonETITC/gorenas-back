import { EmployeeEntity } from "@Infraestructure/orm/typeorm/entities/employee.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeEntity])
    ]
})
export class EmployeeModule { }