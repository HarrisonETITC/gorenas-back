import { BranchProviders } from "@Infraestructure/orm/typeorm/config/providers/branch.providers";
import { BranchEntity } from "@Infraestructure/orm/typeorm/entities/branch.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchController } from "../controllers/branch-controller.adapter";

@Module({
    imports: [
        TypeOrmModule.forFeature([BranchEntity])
    ],
    controllers: [BranchController],
    providers: BranchProviders.concat([]),
    exports: BranchProviders.concat([])
})
export class BranchModule { }