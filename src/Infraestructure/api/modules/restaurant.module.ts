import { RestaurantEntity } from "@Infraestructure/orm/typeorm/entities/restaurant.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([RestaurantEntity])
    ]
})
export class RestaurantModule { }