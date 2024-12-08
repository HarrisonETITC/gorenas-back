import { EmployeeEntity } from "@Infraestructure/orm/typeorm/entities/employee.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "../controllers/employee-controller.adapter";
import { EmployeeProviders } from "@Infraestructure/orm/typeorm/config/providers/employee.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeEntity])
    ],
    controllers: [EmployeeController],
    providers: EmployeeProviders.concat([]),
    exports: EmployeeProviders.concat([])
})
export class EmployeeModule { }