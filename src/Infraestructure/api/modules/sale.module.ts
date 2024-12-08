import { SaleEntity } from "@Infraestructure/orm/typeorm/entities/sale.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleController } from "../controllers/sale-controller.adapter";
import { SaleProviders } from "@Infraestructure/orm/typeorm/config/providers/sale.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([SaleEntity])
    ],
    controllers: [SaleController],
    providers: SaleProviders.concat([]),
    exports: SaleProviders.concat([])
})
export class SaleModule { }