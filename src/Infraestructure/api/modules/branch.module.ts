import { BranchEntity } from "@Infraestructure/orm/typeorm/entities/branch.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([BranchEntity])
    ]
})
export class BranchModule { }