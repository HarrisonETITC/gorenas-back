import { RestaurantModel } from "@Domain/models/restaurant.model";
import { GeneralRepository } from "./general.repository";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { RestaurantModelView } from "@Application/model-view/restaurant.mv";
import { DataSource } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { Inject, Injectable } from "@nestjs/common";
import { RESTAURANT_ENTITY_MAPPER } from "@Application/config/inject-tokens/restaurant.tokens";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

@Injectable()
export class RestaurantRepository extends GeneralRepository<RestaurantModel, RestaurantEntity, RestaurantModelView> implements
    GetAvailableCanSeePort<RestaurantModelView> {
    constructor(
        @Inject(DataSource)
        protected source: DataSource,
        @Inject(RESTAURANT_ENTITY_MAPPER)
        protected mapper: EntityMapperPort<RestaurantModel, RestaurantEntity, RestaurantModelView>
    ) {
        super(source, RestaurantEntity, mapper);
    }

    getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        throw new Error("Method not implemented.");
    }
    getCanSee(params: BasicSearchParams): Promise<RestaurantModelView[]> {
        throw new Error("Method not implemented.");
    }
    getIdValueMany(ids: Array<IdValue>): Promise<Array<IdValue>> {
        throw new Error("Method not implemented.");
    }
}
