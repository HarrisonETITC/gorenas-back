import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { RestaurantModel } from "@Domain/models/restaurant.model";
import { Injectable } from "@nestjs/common";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { RestaurantModelView } from "@Application/model-view/restaurant.mv";
import { RestaurantBuilder } from "@Domain/models/builders/restaurant-model.builder";
import { AppUtil } from "@Application/core/utils/app.util";

@Injectable()
export class RestaurantEntityMapper implements EntityMapperPort<RestaurantModel, RestaurantEntity, RestaurantModelView> {
    fromEntityToDomain(entity: RestaurantEntity): RestaurantModel {
        return new RestaurantBuilder()
            .setId(entity.id ?? null)
            .setName(entity.name ?? null)
            .setAddress(entity.address ?? null)
            .build();
    }
    fromDomainToEntity(domain: RestaurantModel): RestaurantEntity {
        return {
            id: domain.id ?? null,
            name: domain.name ?? null,
            address: domain.address ?? null
        };
    }
    fromDomainToMv(domain: RestaurantModel, extra?: Map<string, string>): RestaurantModelView {
        return {
            id: domain.id,
            name: domain.name,
            address: domain.address,
            branches: AppUtil.findNumberField(extra, 'branches')
        };
    }
}
