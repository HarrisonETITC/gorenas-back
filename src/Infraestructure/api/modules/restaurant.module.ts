import { RestaurantEntity } from "@Infraestructure/orm/typeorm/entities/restaurant.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantController } from "../controllers/restaurant-controller.adapter";
import { RestaurantProviders } from "@Infraestructure/orm/typeorm/config/providers/restaurant.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([RestaurantEntity])
    ],
    controllers: [RestaurantController],
    providers: RestaurantProviders.concat([]),
    exports: RestaurantProviders.concat([])
})
export class RestaurantModule { }