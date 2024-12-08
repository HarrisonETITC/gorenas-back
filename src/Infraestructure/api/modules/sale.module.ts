import { SaleEntity } from "@Infraestructure/orm/typeorm/entities/sale.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([SaleEntity])
    ]
})
export class SaleModule { }