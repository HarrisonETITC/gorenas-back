import { RESTAURANT_DTO_MAPPER, RESTAURANT_ENTITY_MAPPER, RESTAURANT_REPOSITORY, RESTAURANT_SERVICE } from "@Application/config/inject-tokens/restaurant.tokens";
import { Provider } from "@nestjs/common";
import { RestaurantEntityMapper } from "../../mappers/restaurant-entity.mapper";
import { RestaurantRepository } from "../../repositories/restaurant.repository";
import { RestaurantDtoMapper } from "@Application/mappers/restaurant-dto.mapper";
import { RestaurantServiceAdapter } from "@Application/adapters/restaurant-service.adapter";

export const RestaurantProviders: Array<Provider> = [
    {
        provide: RESTAURANT_ENTITY_MAPPER,
        useClass: RestaurantEntityMapper
    },
    {
        provide: RESTAURANT_REPOSITORY,
        useClass: RestaurantRepository
    },
    {
        provide: RESTAURANT_DTO_MAPPER,
        useClass: RestaurantDtoMapper
    },
    {
        provide: RESTAURANT_SERVICE,
        useClass: RestaurantServiceAdapter
    }
]
