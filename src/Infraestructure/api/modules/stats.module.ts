import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsController } from "../controllers/stats-controller.adapter";
import { StatsProviders } from "@Infraestructure/orm/typeorm/config/providers/stats.providers";
import { SaleEntity } from "@Infraestructure/orm/typeorm/entities/sale.entity";
import { EmployeeEntity } from "@Infraestructure/orm/typeorm/entities/employee.entity";
import { BranchEntity } from "@Infraestructure/orm/typeorm/entities/branch.entity";
import { PersonEntity } from "@Infraestructure/orm/typeorm/entities/person.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SaleEntity,
            EmployeeEntity,
            BranchEntity,
            PersonEntity
        ])
    ],
    controllers: [StatsController],
    providers: StatsProviders,
    exports: StatsProviders
})
export class StatsModule { }
