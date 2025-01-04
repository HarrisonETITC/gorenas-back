import { Inject, Injectable } from "@nestjs/common";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { RestaurantModel } from "@Domain/models/restaurant.model";
import { RestaurantCreateDto } from "@Domain/models/create-dto/restaurant-create.dto";
import { RestaurantUpdateDto } from "@Domain/models/update-dto/restaurant-update.dto";
import { RestaurantModelView } from "@Application/model-view/restaurant.mv";
import { RESTAURANT_DTO_MAPPER, RESTAURANT_REPOSITORY } from "@Application/config/inject-tokens/restaurant.tokens";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";

@Injectable()
export class RestaurantServiceAdapter extends GeneralServiceAdapter<RestaurantModel, RestaurantCreateDto, RestaurantUpdateDto, RestaurantModelView> {
    constructor(
        @Inject(RESTAURANT_REPOSITORY)
        private readonly restaurantRepository: GeneralRepositoryPort<RestaurantModel, RestaurantModelView>
            & GenerateModelViewPort<RestaurantModel, RestaurantModelView>
            & GetAvailableCanSeePort<RestaurantModelView>,
        @Inject(RESTAURANT_DTO_MAPPER)
        private readonly restaurantMapper: DtoMapperPort<RestaurantModel, RestaurantCreateDto, RestaurantUpdateDto>
    ) {
        super(restaurantRepository, restaurantMapper);
    }
}
