import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { RestaurantModel } from "@Domain/models/restaurant.model";
import { RestaurantCreateDto } from "@Domain/models/create-dto/restaurant-create.dto";
import { RestaurantUpdateDto } from "@Domain/models/update-dto/restaurant-update.dto";
import { RestaurantModelView } from "@Application/model-view/restaurant.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { RESTAURANT_SERVICE } from "@Application/config/inject-tokens/restaurant.tokens";

@Controller('restaurant')
export class RestaurantController extends GeneralControllerAdapter<RestaurantModel, RestaurantCreateDto, RestaurantUpdateDto, RestaurantModelView> {
    constructor(
        @Inject(RESTAURANT_SERVICE) private readonly restaurantService: GeneralServicePort<RestaurantModel, RestaurantCreateDto, RestaurantUpdateDto> & GenerateModelViewPort<RestaurantModel, RestaurantModelView>
    ) {
        super(restaurantService)
    }
}
